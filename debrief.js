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

let attacks =
  [ { name: "Scanning Kiddie"
    , steps: [ { name: "Scan offices", countered: false, counters: [ "Firewall office" ] }
             , { name: "Scan offices", countered: false, counters: [ "Firewall office" ] }
             , { name: "Scan offices", countered: false, counters: [ "Firewall office" ] }
             , { name: "Scan offices", countered: false, counters: [ "Firewall office" ] }
             ]
    }
  , { name: "DoSing Kiddie"
    , steps: [ { name: "", countered: true, counters: [] }
             , { name: "DoS offices", countered: false, counters: [ "Firewall office" ] }
             , { name: "DoS offices", countered: false, counters: [ "Firewall office" ] }
             , { name: "DoS offices", countered: false, counters: [ "Firewall office" ] }
             ]
    }
  , { name: "Hacking Kiddie"
    , steps: [ { name: "", countered: true, counters: [] }
             , { name: "Remote control server offices", countered: false, counters: [ "Upgrade server & DB" ] }
             , { name: "Data exfiltration server offices", countered: false, counters: [ "Monitoring office", "Encryption DB" ] }
             , { name: "Data exfiltration server offices", countered: false, counters: [ "Monitoring office", "Encryption DB" ] }
             ]
    }
  , { name: "Phishing Kiddie"
    , steps: [ { name: "Phishing offices (trojan)", countered: false, counters: [ "Security training", "Antivirus", "Upgrade PC" ] }
             , { name: "Disruption PC offices", countered: false, counters: [ "Antivirus", "Upgrade PC" ] }
             , { name: "Disruption PC offices", countered: false, counters: [ "Antivirus", "Upgrade PC" ] }
             , { name: "Disruption PC offices", countered: false, counters: [ "Antivirus", "Upgrade PC" ] }
             ]
    }
  , { name: "Mafia APT PC Offices"
    , steps: [ { name: "Infected USB offices", countered: false, counters: [ "Security training", "Antivirus" ] }
             , { name: "Remote Control PC offices", countered: false, counters: [ "Antivirus", "Monitoring office" ] }
             , { name: "Data exfiltration PC offices", countered: false, counters: [ "Antivirus", "Monitoring office" ] }
             , { name: "Data exfiltration PC offices", countered: false, counters: [ "Antivirus", "Monitoring office", "Encryption PC" ] }
             ]
    }
  , { name: "Mafia APT Server Offices"
    , steps: [ { name: "Phishing offices (credentials)", countered: false, counters: [ "Security training" ] }
             , { name: "Remote Control Server offices", countered: false, counters: [ "Monitoring office" ] }
             , { name: "Data exfiltration DB offices", countered: false, counters: [ "Monitoring office", "Encryption DB" ] }
             , { name: "Data exfiltration DB offices", countered: false, counters: [ "Monitoring office", "Encryption DB" ] }
             ]
    }
  , { name: "Mafia APT Server Plant"
    , steps: [ { name: "Vulnerable Wi-Fi plant", countered: false, counters: [ "Asset audit" ] }
             , { name: "Remote Control DB plant", countered: false, counters: [ "Monitoring office", "Upgrade server & DB" ] }
             , { name: "Data exfiltration DB plant", countered: false, counters: [ "Monitoring plant", "Encryption DB" ] }
             , { name: "Data exfiltration DB plant", countered: false, counters: [ "Monitoring plant", "Encryption DB" ] }
             ]
    }
  , { name: "Mafia Disruption Controller"
    , steps: [ { name: "Scan plant", countered: false, counters: [ "Firewall plant" ] }
             , { name: "Remote control Controller", countered: false, counters: [ "Upgrade controller", "Firewall plant" ] }
             , { name: "Disruption controller", countered: false, counters: [ "Upgrade controller" ] }
             , { name: "Disruption controller", countered: false, counters: [ "Upgrade controller" ] }
             ]
    }
  , { name: "Nation State Intelligence"
    , steps: [ { name: "Physical intrusion plant", countered: false, counters: [ "CCTV plant" ] }
             , { name: "Remote control DB plant (0day)", countered: false, counters: [ "Monitoring plant" ] }
             , { name: "Data exfiltration DB plant", countered: false, counters: [ "Monitoring plant" ] }
             , { name: "Data exfiltration DB plant", countered: false, counters: [ "Monitoring plant" ] }
             ]
    }
  , { name: "Nation State Disruption"
    , steps: [ { name: "Physical intrusion plant", countered: false, counters: [] }
             , { name: "Remote control controller (0day)", countered: false, counters: [ "CCTV plant" ] }
             , { name: "", countered: true, counters: [] }
             , { name: "Disruption controller", countered: false, counters: [] }
             ]
    }
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

function counter_attacks(attacks, defences) {
  for (a in attacks) {
    let attack = attacks[a];
    let deployed_defences = [];
    var already_countered = false;
    for (s in attack.steps) {
      let round_n = "round_"+(parseInt(s)+1);
      let step = attack.steps[s];
      let defences = state[round_n].defences;
      for (d in defences) {
        deployed_defences.push(defences[d]);
      }
      if (step.counters.length == 0 || already_countered) {
        step.countered = true;
      } else {
        step.countered = false;
        for (dd in deployed_defences) {
          if (step.counters.includes(deployed_defences[dd].name)) {
            step.countered = true;
            already_countered = true;
          }
        }
      }
    }
  }
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

  // update attack table
  counter_attacks(attacks, defences);

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

function render_step(step, div) {
  let title_div = div.getElementsByClassName("attack_step_title")[0];
  let counters_div = div.getElementsByClassName("attack_step_counters")[0];
  title_div.innerHTML = step.name;
  while (counters_div.hasChildNodes()) {
    counters_div.removeChild(counters_div.lastChild);
  }
  for (c in step.counters) {
    let counter = step.counters[c];
    let counter_li = document.createElement("li");
    counter_li.innerHTML = counter;
    counters_div.appendChild(counter_li);
  }
  if (step.countered) {
    div.classList.add("countered");
    div.classList.remove("uncountered");
  } else {
    div.classList.add("uncountered");
    div.classList.remove("countered");
  }
}

function render(state) {

  // investments table
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

  // scores
  for (score in scores) {
    let div = document.getElementsByClassName("score " + score)[0];
    let score_bar = div.getElementsByClassName("score_bar")[0];
    score_bar.style.width = 20 * scores[score] * score_scale[score] + "px";
    let score_value = div.getElementsByClassName("score_value")[0];
    score_value.innerHTML = scores[score];

  }

  // attacks table
  for (a in attacks) {
    let attack = attacks[a];
    let attack_div = document.getElementById(attack.name);
    let attack_steps_divs = attack_div.getElementsByClassName("attack_step");
    for (s in attack.steps) {
      let step = attack.steps[s];
      let attack_step_div = attack_steps_divs[s];
      render_step(step, attack_step_div);
    }
  }

};

render(state);
