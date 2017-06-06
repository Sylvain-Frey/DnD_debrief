////////////////////////////////////////////////////////////////////////////////
// Copyright Sylvain Frey, University of Southampton, CC-BY-NC.               //
// Contact: s.a.f.frey [at] soton.ac.uk        http://twitter.com/sylfrey     //
//                                                                            //
// This code is published under the Creative Commons licence.                 //
// To view a copy of this license, visit:                                     //
//   https://creativecommons.org/licenses/by-nc/4.0/                          //
//                                                                            //
// Decisions & Disruptions (http://decisions-disruptions.org) is a tabletop   //
// cyber security game, also licenced CC-BY-NC by Lancaster University.       //
////////////////////////////////////////////////////////////////////////////////

  //////////////////
 // domain model //
//////////////////

/**
 * Defence attributes:
 *   - name: unique string, used to identify the defence, i.e.
 *     defence1 == defence2 iff defence1.name == defence2.name.
 *   - cost: in thousands of credits ("k").
 *   - category: one of the following six, used to compute scores:
 *     > cyber_defence
 *     > advanced_cyber_defence
 *     > physical_defence
 *     > human_factors
 *     > intelligence_gathering
 *     > data_defence
 * Note: an extra "None" defence is used in the attacks table to denote attack
 *       steps that have no counter.
 */
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

/**
 * Attack attributes:
 *   - name: shows the threat level: Kiddie, Mafia or Nation State.
 *   - steps: four consecutive steps corresponding to the actions of the attacker
 *     during rounds 1 to 4, and the ways to counter them.
 * Step attributes (the position of a step in the steps array gives the round,
 * e.g. attack.steps[1] is the step of the 2nd round for this attack):
 *   - name: hopefully descriptive enough.
 *   - countered: whether the step is countered, i.e. whether one of the counters
 *     is deployed during the round of the step.
 *   - counters: list of defences that counter the step.
 * !! Rule: as soon as one step of an attack is countered (by having the right
 * !! defence deployed during the corresponding round) then the following steps
 * !! (i.e. the rest of the attack) is also countered automatically.
 */
let attacks =
  [ { name: "Scanning Kiddie"
    , steps: [ { name: "Scan offices", countered: false, counters: [ "Firewall office" ] }
             , { name: "Scan offices", countered: false, counters: [ "Firewall office" ] }
             , { name: "Scan offices", countered: false, counters: [ "Firewall office" ] }
             , { name: "Scan offices", countered: false, counters: [ "Firewall office" ] }
             ]
    }
  , { name: "DoSing Kiddie"
    , steps: [ { name: ""           , countered: true , counters: []                    }
             , { name: "DoS offices", countered: false, counters: [ "Firewall office" ] }
             , { name: "DoS offices", countered: false, counters: [ "Firewall office" ] }
             , { name: "DoS offices", countered: false, counters: [ "Firewall office" ] }
             ]
    }
  , { name: "Hacking Kiddie"
    , steps: [ { name: ""                                , countered: true , counters: []                                       }
             , { name: "Remote control server offices"   , countered: false, counters: [ "Upgrade server & DB" ]                }
             , { name: "Data exfiltration server offices", countered: false, counters: [ "Monitoring office", "Encryption DB" ] }
             , { name: "Data exfiltration server offices", countered: false, counters: [ "Monitoring office", "Encryption DB" ] }
             ]
    }
  , { name: "Phishing Kiddie"
    , steps: [ { name: "Phishing offices (trojan)", countered: false, counters: [ "Security training", "Antivirus", "Upgrade PC" ] }
             , { name: "Disruption PC offices"    , countered: false, counters: [ "Antivirus", "Upgrade PC" ]                      }
             , { name: "Disruption PC offices"    , countered: false, counters: [ "Antivirus", "Upgrade PC" ]                      }
             , { name: "Disruption PC offices"    , countered: false, counters: [ "Antivirus", "Upgrade PC" ]                      }
             ]
    }
  , { name: "Mafia APT PC Offices"
    , steps: [ { name: "Infected USB offices"        , countered: false, counters: [ "Security training", "Antivirus" ]                  }
             , { name: "Remote Control PC offices"   , countered: false, counters: [ "Antivirus", "Monitoring office" ]                  }
             , { name: "Data exfiltration PC offices", countered: false, counters: [ "Antivirus", "Monitoring office", "Encryption PC" ] }
             , { name: "Data exfiltration PC offices", countered: false, counters: [ "Antivirus", "Monitoring office", "Encryption PC" ] }
             ]
    }
  , { name: "Mafia APT Server Offices"
    , steps: [ { name: "Phishing offices (credentials)", countered: false, counters: [ "Security training" ]                  }
             , { name: "Remote Control Server offices" , countered: false, counters: [ "Monitoring office" ]                  }
             , { name: "Data exfiltration DB offices"  , countered: false, counters: [ "Monitoring office", "Encryption DB" ] }
             , { name: "Data exfiltration DB offices"  , countered: false, counters: [ "Monitoring office", "Encryption DB" ] }
             ]
    }
  , { name: "Mafia APT Server Plant"
    , steps: [ { name: "Vulnerable Wi-Fi plant"    , countered: false, counters: [ "Asset audit" ]                              }
             , { name: "Remote Control DB plant"   , countered: false, counters: [ "Monitoring office", "Upgrade server & DB" ] }
             , { name: "Data exfiltration DB plant", countered: false, counters: [ "Monitoring plant", "Encryption DB" ]        }
             , { name: "Data exfiltration DB plant", countered: false, counters: [ "Monitoring plant", "Encryption DB" ]        }
             ]
    }
  , { name: "Mafia Disruption Controller"
    , steps: [ { name: "Scan plant"               , countered: false, counters: [ "Firewall plant" ]                       }
             , { name: "Remote control Controller", countered: false, counters: [ "Upgrade controller", "Firewall plant" ] }
             , { name: "Disruption controller"    , countered: false, counters: [ "Upgrade controller" ]                   }
             , { name: "Disruption controller"    , countered: false, counters: [ "Upgrade controller" ]                   }
             ]
    }
  , { name: "Nation State Intelligence"
    , steps: [ { name: "Physical intrusion plant"      , countered: false, counters: [ "CCTV plant" ]       }
             , { name: "Remote control DB plant (0day)", countered: false, counters: [ "Monitoring plant" ] }
             , { name: "Data exfiltration DB plant"    , countered: false, counters: [ "Monitoring plant" ] }
             , { name: "Data exfiltration DB plant"    , countered: false, counters: [ "Monitoring plant" ] }
             ]
    }
  , { name: "Nation State Disruption" // see note on the "None" counter in the doc on defences.
    , steps: [ { name: "Physical intrusion plant"        , countered: false, counters: [ "CCTV plant" ] }
             , { name: "Remote control controller (0day)", countered: false, counters: [ "None" ]       }
             , { name: "Remote control controller (0day)", countered: false, counters: [ "None" ]       }
             , { name: "Disruption controller"           , countered: false, counters: [ "None" ]       }
             ]
    }
  ];


  ////////////////
 // game state //
////////////////

/**
 * The state of the game world:
 *   - uninvested: the list of defences that the players have not bought yet,
 *     and a virtual (neagtive) budget equal to the value of all defences combined.
 *   - round_i: the budget for round i (100k + leftovers from previous rounds)
 *     and the list of defences bought during that round.
 * !! Updates to the world's state should ensure that budget constraints are
 * !! respected, i.e. buying a defence reduces the corresponding budget.
 */
let state = { 'uninvested': { budget: -500, defences: defences }
            , 'round_1':    { budget:  100, defences: [] }
            , 'round_2':    { budget:  200, defences: [] }
            , 'round_3':    { budget:  300, defences: [] }
            , 'round_4':    { budget:  400, defences: [] }
            };

/**
 * Scores measure players' affinity with the 6 defence categories.
 * Investing in a defence from a category during round r raises the score for
 * that category by (5-r), i.e.:
 * Round the defence is bought:  1  2  3  4  never
 * Cateogry score increase:      4  3  2  1  0
 */
let scores = { "physical_defence": 0
             , "advanced_cyber_defence": 0
             , "cyber_defence": 0
             , "data_defence": 0
             , "intelligence_gathering": 0
             , "human_factors": 0
             }



  //////////////////
 // game actions //
//////////////////

/**
 * Remove a defence from an array of defences, equality based on defence.name.
 */
function remove(defence, array) {
  return array.filter( d => d.name !== defence.name );
};

/**
 * Given a round name (string!) return how much was spent during that round,
 * i.e. the sum of the cost of all defences bought during the round.
 */
function compute_expenses(round_name) {
  return state[round_name].defences.reduce(
    (acc, def) => acc + def.cost, 0);
}

/**
 * The following three functions handle click, drag and drop events.
 * Function drop(ev) triggers a game state update. */

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


/**
 * Update the attacks table (more precisely, the countered attribute of all steps)
 * based on the current set of defences bought by the players for each round.
 */
function counter_attacks(attacks, defences) {
  for (a in attacks) {
    let attack = attacks[a];
    let deployed_defences = []; // list of defences deployed so far
    var already_countered = false; // whether the attack has been countered as we iterate through steps
    for (s in attack.steps) {
      let step = attack.steps[s];
      let round_n = "round_"+(parseInt(s)+1); //!! rounds = 1..4, arrays start at 0
      let defences_deployed_during_round_n = state[round_n].defences;
      for (d in defences_deployed_during_round_n) {
        // update the list of defences deployed so far
        deployed_defences.push(defences_deployed_during_round_n[d]);
      }
      // update the countered attribute for that particular step
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

/**
 * The main function updating the game state.
 * Triggered by an investment (moving defence from src to dest).
 * This function updates state to reflect the investment, balances the
 * corresponding budgets, updates the scores and the attack table.
 * At the end of the update, the render function is called to redraw the page.
 * !! As of now the validity of investments (i.e. checking whether enough funds
 * are available) is not enforced.
 */
function update(defence, src, dest) {

  // move defence around
  state[src].defences = remove(defence, state[src].defences);
  state[dest].defences.push(defence);

  // balance budgets
  state['uninvested'].budget = -compute_expenses('uninvested');
  var spent = 0; // how much has been spent since round 1
  for (i=1; i<5; i++) {
    spent += compute_expenses('round_'+i)
    state['round_'+i].budget = 100*i - spent; // 100k + leftovers - expenses per round
  }

  // re-compute scores
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

  // render the page based on the new state
  render(state);

}


  ///////////////
 // rendering //
///////////////

/**
 * Generate HTML representation of a defence from the domain model.
 * Example generated HTML:
 * <div id="Firewall office"
        cost="30"
        class="defence cyber_defence"
        draggable="true"
        ondragstart="drag(event)">Firewall office (30k)</div>
 */
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

/**
 * The scores are not displayed using the same scale, as some maximum scores can
 * be high (18 for cyber_defence) and some not as much (4 for human_factors).
 */
let score_scale = { "physical_defence": 1
                  , "advanced_cyber_defence": 1
                  , "cyber_defence": .5
                  , "data_defence": 1
                  , "intelligence_gathering": 1
                  , "human_factors": 2
                  }

/**
 * Update an attack_step_div with the HTML representation of an attack step.
 * Example updated attack_step_div:
 * <div class="attack_step as_3 countered">
     <div class="attack_step_title">Data exfiltration DB plant</div>
     <ul class="attack_step_counters">
       <li>Monitoring plant</li>
       <li>Encryption DB</li>
     </ul>
   </div>
 * Note: Passed the first rendering, what is really needed is only the update on
 *       whether or not the attack step is countered. We are rendering everything
 *       again. Too bad.
 */
function render_step(step, attack_step_div) {
  let title_div = attack_step_div.getElementsByClassName("attack_step_title")[0];
  let counters_div = attack_step_div.getElementsByClassName("attack_step_counters")[0];
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
    attack_step_div.classList.add("countered");
    attack_step_div.classList.remove("uncountered");
  } else {
    attack_step_div.classList.add("uncountered");
    attack_step_div.classList.remove("countered");
  }
}

/**
 * Main rendering function. Three main components need to be rendered:
 *   - the investments table
 *   - the scores
 *   - the attacks table
 */
function render(state) {

  // investments table
  for (round in state) {
    // update the corresponding round_div with defences invested in during that round
    let round_div = document.getElementById(round);

    let budget = round_div.getElementsByClassName("budget")[0];
    budget.innerHTML = state[round].budget

    let defences = round_div.getElementsByClassName("defence_list")[0];
    while (defences.hasChildNodes()) {
      defences.removeChild(defences.lastChild);
    }
    for (i in state[round].defences) {
      defences.appendChild(render_defence(state[round].defences[i]));
    }
  }

  // scores
  for (score in scores) {
    // update each score values and score bar (also a div) based on score value
    //mand scaling factor
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
