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
 *     defence1 === defence2 iff defence1.name === defence2.name.
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
 *   - effect: description of the visible effect of the attack seen by the players when the attack is successful.
 *   - counters: map of defence names to description of the visible effect of
 *     the counter to the players.
 *   - countered_by: name of the defence that is countering this step, or
       "earlier counter" if the attack has been countered at a previous step.
       This attribute is updated as the game goes on.
 * !! Rule: as soon as one step of an attack is countered (by having the right
 * !! defence deployed during the corresponding round) then the following steps
 * !! (i.e. the rest of the attack) is also countered automatically.
 */
let attacks =
  [ { name: "Scanning Kiddie"
    , steps: [ { name: "Scan offices"
               , countered: false
               , effect: "No visible effect."
               , countered_by: ""
               , counters: { "Firewall office" : "The office firewall intercepts a number of scanning attempts from all over the world. Apparently, there are people out there very interested in knowing more about your office network." }
               }
             , { name: "Scan offices"
               , countered: false
               , effect: "No visible effect."
               , countered_by: ""
               , counters: { "Firewall office" : "The office firewall intercepts a number of scanning attempts from all over the world. Apparently, there are people out there very interested in knowing more about your office network." }
               }
             , { name: "Scan offices"
               , countered: false
               , effect: "No visible effect."
               , countered_by: ""
               , counters: { "Firewall office" : "The office firewall intercepts a number of scanning attempts from all over the world. Apparently, there are people out there very interested in knowing more about your office network." }
               }
             , { name: "Scan offices"
               , countered: false
               , effect: "No visible effect."
               , countered_by: ""
               , counters: { "Firewall office" : "The office firewall intercepts a number of scanning attempts from all over the world. Apparently, there are people out there very interested in knowing more about your office network." }
               }
             ]
    }
  , { name: "DoSing Kiddie"
    , steps: [ { name: ""
               , countered: true
               , effect: ""
               , countered_by: ""
               , counters: {}
               }
             , { name: "DoS offices"
               , countered: false
               , effect: "The office network is hit with traffic generated by hundreds of infected bots from all around the world. The network is out of order, no one can connect to the Internet, and the local database and server crash. As no employee can work properly for several days, the share price takes a small dip."
               , countered_by: ""
               , counters: { "Firewall office" : "A sudden surge of traffic is detected: a number of machines from all around the world are trying to flood your office network with requests. Fortunately, your network administrator can quickly update the filtering rules of the offices firewall, and the attack does not cause much disruption." }
               }
             , { name: "DoS offices"
               , countered: false
               , effect: "The office network is hit with traffic generated by hundreds of infected bots from all around the world. The network is out of order, no one can connect to the Internet, and the local database and server crash. As no employee can work properly for several days, the share price takes a small dip."
               , countered_by: ""
               , counters: { "Firewall office" : "A sudden surge of traffic is detected: a number of machines from all around the world are trying to flood your office network with requests. Fortunately, your network administrator can quickly update the filtering rules of the offices firewall, and the attack does not cause much disruption." }
               }
             , { name: "DoS offices"
               , countered: false
               , effect: "The office network is hit with traffic generated by hundreds of infected bots from all around the world. The network is out of order, no one can connect to the Internet, and the local database and server crash. As no employee can work properly for several days, the share price takes a small dip."
               , countered_by: ""
               , counters: { "Firewall office" : "A sudden surge of traffic is detected: a number of machines from all around the world are trying to flood your office network with requests. Fortunately, your network administrator can quickly update the filtering rules of the offices firewall, and the attack does not cause much disruption." }
               }
             ]
    }
  , { name: "Hacking Kiddie"
    , steps: [ { name: ""
               , countered: true
               , effect: ""
               , countered_by: ""
               , counters: {}
               }
             , { name: "Remote control server offices"
               , countered: false
               , effect: "No visible effect."
               , countered_by: ""
               , counters: { "Upgrade server & DB" : "The logs of the server show that someone on the Internet tried to use an SQL injection to compromise the server. This would have affected the old version of the software, but fortunately, the vulnerability has been patched." }
               }
             , { name: "Data exfiltration server offices"
               , countered: false
               , effect: "You receive a snarky email written in an approximate language and taunting the company for their poor security. Soon after, the company's email database is published on the Internet, and the press learns about the breach. The company's share price takes a small dip."
               , countered_by: ""
               , counters: { "Monitoring office" : "One day, the office's network administrator comes to talk to you: they have detected a suspicious data stream originating from the database and going to an unknown address on the Internet, located in a foreign country. Upon closer investigation, it was a data exfiltration attack: the administrator makes sure that the link to the attacker's machine is shut down and any malware on the infected target is removed."
                           , "Encryption DB" : "No visible effect: the data stolen by the attackers is unreadable and cannot be exploited."
                           }
               }
             , { name: "Data exfiltration server offices"
               , countered: false
               , effect: "You receive a snarky email written in an approximate language and taunting the company for their poor security. Soon after, the company's email database is published on the Internet, and the press learns about the breach. The company's share price takes a small dip."
               , countered_by: ""
               , counters: { "Monitoring office" : "One day, the office's network administrator comes to talk to you: they have detected a suspicious data stream originating from the database and going to an unknown address on the Internet, located in a foreign country. Upon closer investigation, it was a data exfiltration attack: the administrator makes sure that the link to the attacker's machine is shut down and any malware on the infected target is removed."
                           , "Encryption DB" : "No visible effect: the data stolen by the attackers is unreadable and cannot be exploited."
                           }
               }
             ]
    }
  , { name: "Phishing Kiddie"
    , steps: [ { name: "Phishing offices (trojan)"
               , countered: false
               , effect: "No visible effect."
               , countered_by: ""
               , counters: { "Security training" : "Upon receiving an email with an attachment from an unknown source, an employee reports it directly to you. Upon close inspection, the attachment did indeed contain malware. Good thing the employee knew better than opening it themselves!"
                           , "Antivirus" : "Upon opening an attachment from an unknown sender, the antivirus fires an alert and announces that a malicious program has been stopped from running on the computer. Upon closer inspection, it was indeed a common piece of malware the antivirus stopped just in time: disaster averted!"
                           , "Upgrade PC" : "No visible effect: the upgrade makes PCs immune to the attack."
                           }
               }
             , { name: "Disruption PC offices"
               , countered: false
               , effect: "Employees signal that their machines have stopped functioning and display bizarre messages. You receive a threatening email asking for a 10k ransom in exchange of a decryption key. The board of directors strictly forbids you from paying the ransom. The lost data is never recovered, and the infected machines have to be replaced. The company's share price suffers lightly from the disruption."
               , countered_by: ""
               , counters: { "Security training" : "Upon receiving an email with an attachment from an unknown source, an employee reports it directly to you. Upon close inspection, the attachment did indeed contain malware. Good thing the employee knew better than opening it themselves!"
                           , "Antivirus" : "Upon opening an attachment from an unknown sender, the antivirus fires an alert and announces that a malicious program has been stopped from running on an office computer. Upon closer inspection, it was indeed a common piece of malware the antivirus stopped just in time: disaster averted!"
                           , "Upgrade PC" : "No visible effect: the upgrade makes PCs immune to the attack."
                           }
               }
             , { name: "Disruption PC offices"
               , countered: false
               , effect: "Employees signal that their machines have stopped functioning and display bizarre messages. You receive a threatening email asking for a 10k ransom in exchange of a decryption key. The board of directors strictly forbids you from paying the ransom. The lost data is never recovered, and the infected machines have to be replaced. The company's share price suffers lightly from the disruption."
               , countered_by: ""
               , counters: { "Security training" : "Upon receiving an email with an attachment from an unknown source, an employee reports it directly to you. Upon close inspection, the attachment did indeed contain malware. Good thing the employee knew better than opening it themselves!"
                           , "Antivirus" : "Upon opening an attachment from an unknown sender, the antivirus fires an alert and announces that a malicious program has been stopped from running on an office computer. Upon closer inspection, it was indeed a common piece of malware the antivirus stopped just in time: disaster averted!"
                           , "Upgrade PC" : "No visible effect: the upgrade makes PCs immune to the attack."
                           }
               }
             , { name: "Disruption PC offices"
               , countered: false
               , effect: "Employees signal that their machines have stopped functioning and display bizarre messages. You receive a threatening email asking for a 10k ransom in exchange of a decryption key. The board of directors strictly forbids you from paying the ransom. The lost data is never recovered, and the infected machines have to be replaced. The company's share price suffers lightly from the disruption."
               , countered_by: ""
               , counters: { "Security training" : "Upon receiving an email with an attachment from an unknown source, an employee reports it directly to you. Upon close inspection, the attachment did indeed contain malware. Good thing the employee knew better than opening it themselves!"
                           , "Antivirus" : "Upon opening an attachment from an unknown sender, the antivirus fires an alert and announces that a malicious program has been stopped from running on an office computer. Upon closer inspection, it was indeed a common piece of malware the antivirus stopped just in time: disaster averted!"
                           , "Upgrade PC" : "No visible effect: the upgrade makes PCs immune to the attack."
                           }
               }
             ]
    }
  , { name: "Mafia APT PC Offices"
    , steps: [ { name: "Infected USB offices"
               , countered: false
               , effect: "No visible effect."
               , countered_by: ""
               , counters: { "Security training" : "Upon finding a thumb drive in the office's parking lot, an employee reports it directly to you. Upon close inspection, the thumb drive did indeed contain malware. Good thing the employee knew better than opening it themselves!"
                           , "Antivirus" : "Upon plugging in a thumb drive found in the office's parking lot, the antivirus fires an alert and announces that a malicious program has been stopped from running on an office computer. Upon closer inspection, it was indeed a common piece of malware the antivirus stopped just in time: disaster averted!"
                           }
               }
             , { name: "Remote Control PC offices"
               , countered: false
               , effect: "No visible effect."
               , countered_by: ""
               , counters: { "Antivirus" : "One day, seemingly out of nowhere, the antivirus fires an alert and announces that a malicious program has been stopped from running on an office computer. Upon closer inspection, it was indeed a common piece of malware the antivirus stopped just in time: disaster averted!"
                           , "Monitoring office" : "One day, the office's network administrator comes to talk to you: they have detected suspicious activity on the office network. A PC seems to be communicating at regular intervals with an unknown machine on the Internet, located in a foreign country. Upon closer investigation, the PC was compromised and remotely operated: the administrator makes sure that the link to the attacker's machine is shut down and any malware on the infected target is removed."
                           }
               }
             , { name: "Data exfiltration PC offices"
               , countered: false
               , effect: "A data dump is advertised for sale on the Dark Web, that contains sensitive emails and technical data from the company. The press learns about the data leak, and the company's share price plummets."
               , countered_by: ""
               , counters: { "Antivirus" : "One day, seemingly out of nowhere, the antivirus fires an alert and announces that a malicious program has been stopped from running on an office computer. Upon closer inspection, it was indeed a common piece of malware the antivirus stopped just in time: disaster averted!"
                           , "Monitoring office" : "One day, the office's network administrator comes to talk to you: they have detected a suspicious data stream originating from a PC and going to an unknown address on the Internet, located in a foreign country. Upon closer investigation, it was a data exfiltration attack: the administrator makes sure that the link to the attacker's machine is shut down and any malware on the infected target is removed."
                           , "Encryption PC" : "No visible effect: the data stolen by the attackers is unreadable and cannot be exploited."
                           }
               }
             , { name: "Data exfiltration PC offices"
               , countered: false
               , effect: "A new data dump is leaked with ever more sensitive content, as well as non-important yet embarrassing personal email. You are forced to shut down the entire infrastructure for sanitisation. The company's share price crashes."
               , countered_by: ""
               , counters: { "Antivirus" : "One day, seemingly out of nowhere, the antivirus fires an alert and announces that a malicious program has been stopped from running on an office computer. Upon closer inspection, it was indeed a common piece of malware the antivirus stopped just in time: disaster averted!"
                           , "Monitoring office" : "One day, the office's network administrator comes to talk to you: they have detected a suspicious data stream originating from a PC and going to an unknown address on the Internet, located in a foreign country. Upon closer investigation, it was a data exfiltration attack: the administrator makes sure that the link to the attacker's machine is shut down and any malware on the infected target is removed."
                           , "Encryption PC" : "No visible effect: the data stolen by the attackers is unreadable and cannot be exploited."
                           }
               }
             ]
    }
  , { name: "Mafia APT Server Offices"
    , steps: [ { name: "Phishing offices (credentials)"
               , countered: false
               , effect: "No visible effect."
               , countered_by: ""
               , counters: { "Security training" : "Upon receiving an email with an attachment from an unknown source, your server administrator reports it directly to you. Upon close inspection, the attachment did indeed contain malware. Good thing they knew better than opening it themselves!" }
               }
             , { name: "Remote Control Server offices"
               , countered: false
               , effect: "No visible effect."
               , countered_by: ""
               , counters: { "Monitoring office" : "One day, the office's network administrator comes to talk to you: they have detected suspicious activity on the office network. The server seems to be communicating at regular intervals with an unknown machine on the Internet, located in a foreign country. Upon closer investigation, the server was compromised and remotely operated: the administrator makes sure that the link to the attacker's machine is shut down and any malware on the infected target is removed." }
               }
             , { name: "Data exfiltration DB offices"
               , countered: false
               , effect: "A data dump is put on sale on the Dark Web containing sensitive data from the company: email, HR records, client contracts, and banking details. The press learns about the data leak and the company's share price plummets"
               , countered_by: ""
               , counters: { "Monitoring office" : "One day, the office's network administrator comes to talk to you: they have detected a suspicious data stream originating from the office database and going to an unknown address on the Internet, located in a foreign country. Upon closer investigation, it was a data exfiltration attack: the administrator makes sure that the link to the attacker's machine is shut down and any malware on the infected target is removed."
                           , "Encryption DB" : "No visible effect: the data stolen by the attackers is unreadable and cannot be exploited."
                           }
               }
             , { name: "Data exfiltration DB offices"
               , countered: false
               , effect: "A cryptolocker locks down the content of the office database. As all activity has to be stopped in the office, since no one can work without access to the database, you receive a chilling email asking for a 500k ransom. The board of directors refuses to pay any ransom, and the company, having lost one of its core assets, is forced to shut down."
               , countered_by: ""
               , counters: { "Monitoring office" : "One day, the office's network administrator comes to talk to you: they have detected a suspicious data stream originating from the office database and going to an unknown address on the Internet, located in a foreign country. Upon closer investigation, it was a data exfiltration attack: the administrator makes sure that the link to the attacker's machine is shut down and any malware on the infected target is removed."
                           , "Encryption DB" : "No visible effect: the data stolen by the attackers is unreadable and cannot be exploited."
                           }
               }
             ]
    }
  , { name: "Mafia APT Server Plant"
    , steps: [ { name: "Vulnerable Wi-Fi plant"
               , countered: false
               , effect: "No visible effect."
               , countered_by: ""
               , counters: { "Asset audit" : "During the asset audit, an unsecured, undocumented Wi-Fi network was found in the plant. After some investigation, this was set up years ago by an engineer, who is now retired. They needed to install a set of additional debit sensors on the water stream, and an open Wi-Fi network was a cheap and simple solution compared to deploying a complicated set of cables. The Wi-Fi network was never documented and eventually forgotten. It has now been secured with a strong password." }
               }
             , { name: "Remote Control DB plant"
               , countered: false
               , effect: "No visible effect."
               , countered_by: ""
               , counters: { "Monitoring plant" : "One day, the office's network administrator comes to talk to you: they have detected suspicious activity on the plant network. The historian database seems to be communicating at regular intervals with an unknown machine on the Internet, located in a foreign country. Upon closer investigation, the historian was compromised and remotely operated: the administrator makes sure that the link to the attacker's machine is shut down and any malware on the historian is removed."
                           , "Upgrade server & DB" : "No visible effect: the upgrade makes the database immune to the attack."
                           }
               }
             , { name: "Data exfiltration DB plant"
               , countered: false
               , effect: "One of your competitors alerts you that someone is trying to sell sensitive data apparently stolen from your plant database. Shortly after, the story leaks to the press. The company's share price plummets."
               , countered_by: ""
               , counters: { "Monitoring plant" : "One day, the office's network administrator comes to talk to you: they have detected a suspicious data stream originating from the historian database and going to an unknown address on the Internet, located in a foreign country. Upon closer investigation, it was a data exfiltration attack: the administrator makes sure that the link to the attacker's machine is shut down and any malware on the infected historian is removed."
                           , "Encryption DB" : "No visible effect: the data stolen by the attackers is unreadable and cannot be exploited."
                           }
               }
             , { name: "Data exfiltration DB plant"
               , countered: false
               , effect: "One day, the plant database crashes, and recovery attempts reveal that the entire contents have been corrupted. All activities slow down significantly for a few days, as the company's share price takes another dive."
               , countered_by: ""
               , counters: { "Monitoring plant" : "One day, the office's network administrator comes to talk to you: they have detected a suspicious data stream originating from the historian database and going to an unknown address on the Internet, located in a foreign country. Upon closer investigation, it was a data exfiltration attack: the administrator makes sure that the link to the attacker's machine is shut down and any malware on the infected historian is removed."
                           , "Encryption DB" : "No visible effect: the data stolen by the attackers is unreadable and cannot be exploited."
                           }
               }
             ]
    }
  , { name: "Mafia Disruption Controller"
    , steps: [ { name: "Scan plant"
               , countered: false
               , effect: "No visible effect."
               , countered_by: ""
               , counters: { "Firewall plant" : "The firewall intercepts a number of scanning attempts from all over the world. Apparently, there are people out there very interested in knowing more about your plant." }
               }
             , { name: "Remote control Controller"
               , countered: false
               , effect: "No visible effect."
               , countered_by: ""
               , counters: { "Upgrade controller" : "No visible effect: the upgrade makes the controller immune to the attack."
                           , "Firewall plant" : "Upon looking at detailed firewall logs, your plant network administrator discovers that an overseas machine tried to query the remote administration port of your SCADA controller. Fortunately, the firewall's rules denied access to the attacker."
                           }
               }
             , { name: "Disruption controller"
               , countered: false
               , effect: "One day, the turbines suffer from a partial failure, and the damage requires several days of maintenance. Shortly after, you receive a message claiming responsibility for hacking the turbine's controller, and asking for a 500k ransom. The board of directors forbids you from paying anything. The company's share price plummets."
               , countered_by: ""
               , counters: { "Upgrade controller" : "No visible effect: the upgrade makes the controller immune to the attack." }
               }
             , { name: "Disruption controller"
               , countered: false
               , effect: "One day, the turbines start accelerating out of control and finally blow up. Several employees are injured. The company, having lost one of its core assets, is forced to shut down."
               , countered_by: ""
               , counters: { "Upgrade controller" : "No visible effect: the upgrade makes the controller immune to the attack." }
               }
             ]
    }
  , { name: "Nation State Intelligence"
    , steps: [ { name: "Physical intrusion plant"
               , countered: false
               , effect: "No visible effect."
               , countered_by: ""
               , counters: { "CCTV plant" : "An intruder is detected entering the plant perimeter and trying to access the buildings. The moment the security guard comes and asks them what they are doing, they run away." }
               }
             , { name: "Remote control DB plant (0day)"
               , countered: false
               , effect: "No visible effect."
               , countered_by: ""
               , counters: { "Monitoring plant" : "One day, the office's network administrator comes to talk to you: they have detected suspicious activity on the plant network. The historian database seems to be communicating at regular intervals with an unknown machine on the Internet, located in a foreign country. Upon closer investigation, the historian was compromised and remotely operated: the administrator makes sure that the link to the attacker's machine is shut down and any malware on the historian is removed." }
               }
             , { name: "Data exfiltration DB plant"
               , countered: false
               , effect: "No visible effect."
               , countered_by: ""
               , counters: { "Monitoring plant" : "One day, the office's network administrator comes to talk to you: they have detected a suspicious data stream originating from the historian database and going to an unknown address on the Internet, located in a foreign country. Upon closer investigation, it was a data exfiltration attack: the administrator makes sure that the link to the attacker's machine is shut down and any malware on the infected historian is removed." }
               }
             , { name: "Data exfiltration DB plant"
               , countered: false
               , effect: "Optional description: You get a visit from the secret services, telling you that sensitive data related to the company was stolen by a foreign country. The data comes apparently from your plant database, which was compromised for months after a very sophisticated infiltration by foreign agents. Luckily, the public does not learn about it."
               , countered_by: ""
               , counters: { "Monitoring plant" : "One day, the office's network administrator comes to talk to you: they have detected a suspicious data stream originating from the historian database and going to an unknown address on the Internet, located in a foreign country. Upon closer investigation, it was a data exfiltration attack: the administrator makes sure that the link to the attacker's machine is shut down and any malware on the infected historian is removed." }
               }
             ]
    }
  , { name: "Nation State Disruption" // see note on the "None" counter in the doc on defences.
    , steps: [ { name: "Physical intrusion plant"
               , countered: false
               , effect: "No visible effect."
               , countered_by: ""
               , counters: { "CCTV plant" : "An intruder is detected entering the plant perimeter and trying to access the buildings. The moment the security guard comes and asks them what they are doing, they run away." }
               }
             , { name: "Remote control controller (0day)"
               , countered: false
               , effect: "No visible effect."
               , countered_by: ""
               , counters: { "None" : "" }
               }
             , { name: "Remote control controller (0day)"
               , countered: false
               , effect: "No visible effect."
               , countered_by: ""
               , counters: { "None" : "" }
               }
             , { name: "Disruption controller"
               , countered: false
               , effect: "Optional description: one day, the turbines start accelerating out of control and finally blow up. Several employees are injured. The company, having lost one of its core assets, is forced to shut down."
               , countered_by: ""
               , counters: { "None" : "" }
               }
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
    let defence = defences.filter( d => d.name === defence_name )[0];
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
      if (Object.keys(step.counters).length === 0 || already_countered) {
        step.countered = true;
        if (already_countered) step.countered_by = "earlier counter";
      } else {
        step.countered = false;
        for (dd in deployed_defences) {
          if (deployed_defences[dd].name in step.counters) {
            step.countered = true;
            step.countered_by = deployed_defences[dd].name;
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
  for (counter in step.counters) {
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
 * Main rendering function. Four main components need to be rendered:
 *   - the investments table
 *   - the scores
 *   - the attacks table
 *   - the attack narratives
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

  // attacks narratives
  let attack_narratives_div = document.getElementById("attack_narratives");
  for (a in attacks) {
    let attack = attacks[a];
    for (round in attack.steps) {
      let step = attack.steps[round];
      let round_narrative_div = attack_narratives_div.getElementsByClassName("narrative_round_"+(parseInt(round)+1))[0];
      let attack_narrative_div = round_narrative_div.getElementsByClassName(attack.name)[0];
      // round variable is in 0..3 but actual rounds are in 1..4
      let title_div = attack_narrative_div.getElementsByClassName("narrative_title")[0];
      let text_div = attack_narrative_div.getElementsByClassName("narrative_text")[0];
      if (step.countered) {
        title_div.style.color = "green";
        if (step.countered_by === "earlier counter") {
          text_div.innerHTML = "This attack was countered at an earlier stage.";
        } else if (Object.keys(step.counters).length === 0) {
          // special case of attacks that have not started yet.
          text_div.innerHTML = "This attack has not started yet.";
        } else {
          text_div.innerHTML = step.counters[step.countered_by];
        }
      } else  {
        title_div.style.color = "red";
        text_div.innerHTML = step.effect;
      }
    }
  }

};

render(state);
