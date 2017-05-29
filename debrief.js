// domain model
let defences =
  [ { name: "Firewall office",     cost: 30, category: "cyber_defence" }
  , { name: "Firewall plant",      cost: 30, category: "cyber_defence" }
  , { name: "CCTV office",         cost: 50, category: "physical_defence" }
  , { name: "CCTV plant",          cost: 50, category: "physical_defence" }
  , { name: "Monitoring office",   cost: 50, category: "advanced_cyber_defence" }
  , { name: "Monitoring plant",    cost: 50, category: "advanced_cyber_defence" }
  , { name: "Antivirus",           cost: 30, category: "cyber_defence" }
  , { name: "Security training",   cost: 30, category: "human_factors" }
  , { name: "Asset audit",         cost: 30, category: "intelligence_gathering" }
  , { name: "Threat assessment",   cost: 20, category: "intelligence_gathering" }
  , { name: "Upgrade PC",          cost: 30, category: "cyber_defence" }
  , { name: "Upgrade server & DB", cost: 30, category: "cyber_defence" }
  , { name: "Upgrade controller",  cost: 30, category: "cyber_defence" }
  , { name: "Encryption DB",       cost: 20, category: "data_defence" }
  , { name: "Encryption PC",       cost: 20, category: "data_defence" }
  ];


// state
let state = { 'uninvested': { budget: -500, defences: defences }
            , 'round_1':    { budget:  100, defences: [] }
            , 'round_2':    { budget:  200, defences: [] }
            , 'round_3':    { budget:  300, defences: [] }
            , 'round_4':    { budget:  400, defences: [] }
            };
let scores = { "physical_defence": 0
             , "advanced_cyber_defence": 0
             , "cyber_defence": 0
             , "data_defence": 0
             , "intelligence_gathering": 0
             , "human_factors": 0
             }

// actions
function remove(defence, array) {
  return array.filter( d => d.name !== defence.name );
};

function compute_expenses(round_name) {
  return state[round_name].defences.reduce(
    (acc, def) => acc + def.cost, 0);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    defence = ev.target.id;
    src = document.getElementById(defence).parentNode.parentNode.id;
    ev.dataTransfer.setData("defence", defence);
    ev.dataTransfer.setData("src", src);
}

function drop(ev) {
    ev.preventDefault();
    let defence_name = ev.dataTransfer.getData("defence");
    let defence = defences.filter( d => d.name == defence_name )[0];
    let src = ev.dataTransfer.getData("src");
    let dest = ev.target.parentNode.id;
    update(defence, src, dest);
}

function update(defence, src, dest) {

  // move defence around
  state[src].defences = remove(defence, state[src].defences);
  state[dest].defences.push(defence);

  // balance budgets
  state['uninvested'].budget = -compute_expenses('uninvested');
  var spent = 0;
  for (i=1; i<5; i++) {
    spent += compute_expenses('round_'+i)
    state['round_'+i].budget = 100*i - spent;
  }

  // update scores
  for (s in scores) scores[s] = 0;
  for (round=1; round<5; round++) {
    var defences = state['round_'+round].defences;
    for (j in defences) {
      defence = defences[j];
      scores[defence.category] = scores[defence.category]+5-round;
    }
  }

  // render
  render(state);

}

// render
function render_defence(defence) {
  node = document.createElement("div");
  node.setAttribute("id", defence.name);
  node.setAttribute("cost", defence.cost);
  node.setAttribute("class", "defence " + defence.category);
  node.setAttribute("draggable", "true");
  node.setAttribute("ondragstart", "drag(event)");
  node.innerHTML = defence.name + " (" + defence.cost + "k)";
  return node;
};

let score_scale = { "physical_defence": 1
                  , "advanced_cyber_defence": 1
                  , "cyber_defence": .5
                  , "data_defence": 1
                  , "intelligence_gathering": 1
                  , "human_factors": 2
                  }

function render(state) {
  for (round in state) {
    let div = document.getElementById(round);

    let budget = div.getElementsByClassName("budget")[0];
    budget.innerHTML = state[round].budget

    let defences = div.getElementsByClassName("defence_list")[0];
    while (defences.hasChildNodes()) {
      defences.removeChild(defences.lastChild);
    }
    for (i in state[round].defences) {
      defences.appendChild(render_defence(state[round].defences[i]));
    }
  }
  for (score in scores) {
    let div = document.getElementsByClassName("score " + score)[0];
    let score_bar = div.getElementsByClassName("score_bar")[0];
    score_bar.style.width = 20 * scores[score] * score_scale[score] + "px";
  }
};

render(state);
