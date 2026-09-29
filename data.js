window.CHARTS = {"caste": {"years": [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], "high": [18.6, 15.0, 14.7, 14.4, 12.6, 12.3, 11.7, 16.5, 12.8, 11.0, 12.1, 19.9, 12.0, 19.2, 11.9], "low": [20.8, 17.5, 14.5, 14.5, 11.9, 10.1, 7.0, 14.1, 13.9, 6.3, 8.5, 15.9, 9.0, 18.6, 11.1], "repo": [5.89, 6.75, 6.75, 7.49, 7.93, 6.38, 6.08, 6.33, 5.44, 4.06, 4.0, 5.49, 6.5, 6.46, 5.52]}, "rd": {"x": [-19.5, -18.5, -17.5, -16.5, -15.5, -14.5, -13.5, -12.5, -11.5, -10.5, -9.5, -8.5, -7.5, -6.5, -5.5, -4.5, -3.5, -2.5, -1.5, -0.5, 0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 10.5, 11.5, 12.5, 13.5, 14.5, 15.5, 16.5, 17.5, 18.5, 19.5], "y": [0.275, 0.3, 0.269, 0.287, 0.294, 0.31, 0.3, 0.278, 0.297, 0.323, 0.322, 0.341, 0.324, 0.338, 0.358, 0.355, 0.367, 0.385, 0.405, 0.403, 0.301, 0.305, 0.315, 0.335, 0.345, 0.355, 0.374, 0.365, 0.388, 0.388, 0.397, 0.434, 0.436, 0.442, 0.417, 0.447, 0.414, 0.456, 0.42, 0.457]}, "km": {"Downloads (2005–12)": [1.0, 0.836, 0.773, 0.733, 0.693, 0.655, 0.619, 0.59, 0.564, 0.535, 0.503, 0.478, 0.45, 0.426, 0.395, 0.373, 0.338, 0.303, 0.278, 0.26, 0.224, 0.197, 0.175, 0.155, 0.138, 0.119, 0.104, 0.088, 0.077, 0.066, 0.06], "Radio & sales (–1990)": [1.0, 0.969, 0.913, 0.853, 0.786, 0.714, 0.639, 0.568, 0.484, 0.4, 0.32, 0.241, 0.172, 0.115, 0.069, 0.041, 0.024, 0.013, 0.008, 0.005, 0.003, 0.003, 0.002, 0.001, 0.001, 0.001, 0.001, 0.001, 0.001, 0.001, 0.001], "SoundScan (1991–2004)": [1.0, 0.965, 0.926, 0.882, 0.839, 0.796, 0.743, 0.704, 0.661, 0.61, 0.565, 0.516, 0.478, 0.434, 0.39, 0.349, 0.312, 0.276, 0.242, 0.215, 0.187, 0.164, 0.143, 0.124, 0.111, 0.092, 0.077, 0.066, 0.057, 0.046, 0.04], "Streaming (2013–)": [1.0, 0.633, 0.558, 0.516, 0.482, 0.451, 0.428, 0.406, 0.387, 0.368, 0.352, 0.332, 0.313, 0.297, 0.281, 0.265, 0.247, 0.231, 0.217, 0.203, 0.192, 0.176, 0.163, 0.15, 0.138, 0.127, 0.115, 0.106, 0.101, 0.092, 0.084]}, "burger": {"h": [1, 2, 3, 5], "fx": [-2, -4, -7, -9], "price": [7, 13, 20, 28], "total": [5, 9, 13, 19]}, "fed": [["Estimated Fed rule", 2.42], ["Inertial Taylor", 4.0], ["ML Fed", 6.54], ["Taylor (1993)", 7.03], ["Balanced approach", 7.43]], "ipl": [["Raw", 3.62], ["+ skill & context", 1.21], ["Batter, bowler held fixed", -0.08], ["Bowler just hit", 1.54]], "hosting": [["Greece", 6.37, 0.18], ["S. Korea", 16.16, 0.88], ["Germany", 7.61, 0.77], ["China", 126.4, 0.31], ["S. Africa", -12.19, 0.08], ["India", 8.39, 0.58], ["UK", 0.53, 0.62], ["Brazil", 11.46, 0.15], ["Russia", -12.85, 0.38], ["Japan", -10.06, 0.35], ["Qatar", -32.26, 0.62]]};
window.GH = "https://github.com/anshiundefined/";
window.RAW = "https://raw.githubusercontent.com/anshiundefined/";
window.PROJECTS = [
  {r:"caste-monetary-transmission", chart:"caste", fig:"outputs/figures/02_coefficients.png", t:"Caste and Monetary Transmission", tags:["india","macro"], tl:"continuous DiD · panel",
   q:"Does exclusion from formal credit change how RBI rate changes reach Indian states? This repo reproduces my paper and puts it through extra checks.",
   f:"The main estimate reproduces exactly (<b>−0.0227</b> across 34 states, 2011 to 2025). It holds up under a wild cluster bootstrap (p = 0.007), random reshuffling of SC/ST shares (p = 0.03) and dropping any single state. The wasted multiplier comes to 0.81 pp, with a 95% interval of 0.34 to 1.26.",
   cap:"Median credit growth in high and low SC/ST share states, 2011 to 2025",
   m:"RBI · Census 2011 · two-way fixed effects · wild cluster bootstrap · randomisation inference", real:true},
  {r:"anti-incumbency-india", chart:"rd", fig:"outputs/figures/01_rd_plots.png", t:"Do Indian Voters Punish Incumbents?", tags:["india"], tl:"regression discontinuity",
   q:"Does holding a state assembly seat help or hurt a party at the next election? Evidence from 60 years of close contests.",
   f:"A party that narrowly wins a seat is about <b>11 points less likely</b> to hold it next time than a party that narrowly lost. The result is stable across bandwidths and passes a placebo test. Individual candidates don't seem to carry the same penalty.",
   cap:"Chance a party wins the seat again, by its vote margin last time (1-point bins)",
   m:"Election Commission results via DataMeet · local linear RD · placebo and bandwidth checks", real:true},
  {r:"hit-half-life", chart:"km", fig:"outputs/figures/02_survival_by_era.png", t:"The Half-Life of a Hit", tags:["culture","ml"], tl:"survival analysis · music",
   q:"Are songs burning out faster in the streaming era? Sixty-five years of the Billboard Hot 100, treated as a survival problem.",
   f:"The Top 40 has split in two. In the streaming era <b>37% of entries last a single week</b>, compared with 3% before 1991, yet one in five stays for 20 weeks or more. Most Top 10 hits now debut in the Top 10, and a song's first week tells you about half of how long it will last.",
   cap:"Share of Top 40 hits still in the Top 40 after each week, by era",
   m:"Kaplan-Meier · Cox proportional hazards · gradient boosting", real:true},
  {r:"fed-behind-the-curve", chart:"fed", fig:"outputs/figures/02_behind_the_curve.png", t:"How Late Was the Fed?", tags:["macro","ml"], tl:"monetary policy rules",
   q:"How far behind was the Fed in 2021 and 2022? Five benchmarks, one of them a machine learning model of how the Fed behaved before 2020.",
   f:"Judged by its own pre-2020 behaviour, the Fed started raising rates <b>about three quarters late</b> and kept them roughly 2.4 points too low through 2021 and 2022. Textbook Taylor rules put the gap closer to 7 points, but they assume the Fed moves in one jump and rely on output gap estimates nobody had at the time.",
   cap:"Average gap between each benchmark and the actual rate, 2021 to 2022 (pp)",
   m:"FRED · estimated reaction function · Taylor rules · gradient boosting", real:true},
  {r:"burgernomics", chart:"burger", fig:"outputs/figures/02_who_adjusts.png", t:"Burgernomics", tags:["macro","ml"], tl:"FX · PPP · forecasting",
   q:"Can the Big Mac Index tell us where exchange rates are heading?",
   f:"When a currency looks cheap in burger terms, the gap does close over time, but it closes because local burger prices rise. The currency itself usually keeps weakening. None of the forecasting models, gradient boosting included, did better than simply assuming <b>no change</b>.",
   cap:"Share of a burger misvaluation closed after 1 to 5 years, by channel (%)",
   m:"The Economist's Big Mac data · panel regressions · real-time forecasting comparison", real:true},
  {r:"ipl-hot-hand", chart:"ipl", fig:"outputs/figures/01_hot_hand.png", t:"Is There a Hot Hand in the IPL?", tags:["india","ml"], tl:"behavioural · sport",
   q:"After a boundary, is the next ball really more likely to go for four? Every IPL ball since 2008.",
   f:"In the raw data, a boundary is followed by another 3.6 points more often than usual. Once you account for who is batting, who is bowling and the stage of the innings, that drops to about 1 point, and what's left comes from the <b>bowler</b>. After conceding a boundary, bowlers give away another 1.5 points more often. Adding streaks to a prediction model doesn't improve it.",
   cap:"Extra chance of a boundary on the next ball (pp), as controls are added",
   m:"Cricsheet · 285,000 balls · linear probability models · gradient boosting", real:true},
  {r:"hosting-dividend", chart:"hosting", fig:"outputs/figures/01_ln_gdppc_by_host.png", t:"The Hosting Dividend", tags:["macro","ml"], tl:"synthetic control · WDI",
   q:"Do the Olympics, the World Cup or the Delhi Commonwealth Games leave the host economy better off?",
   f:"Across 11 hosts, <b>no event stands out</b> against placebo countries. The one borderline case, South Africa in 2010, points the wrong way. China looks like a big winner, but that is its overall growth, not the Olympics. Delhi 2010 comes out at +8%, well within the noise.",
   cap:"GDP per capita after the event vs a synthetic twin (%). Filled dots: p < 0.10",
   m:"World Bank WDI · synthetic control · generalised synthetic control · placebo tests", real:true},
  {r:"say-sound-gap", chart:"wave", fig:null, t:"The Say-Sound Gap", tags:["culture","ml"], tl:"audio · NLP · clustering",
   q:"Do hit songs sound happier than their lyrics? Audio mood against lyric sentiment, from 1959 to now.",
   f:"Each song's sound is scored from a 30-second preview using its mode, tempo and brightness, and its lyrics are scored for sentiment. Themes in the lyrics are found without a preset list of emotions, using sentence embeddings, UMAP and HDBSCAN. The last step checks whether the gap moves with the economy.",
   cap:"Illustration: a song's sound and its words, drifting apart",
   m:"iTunes previews · LRCLIB (lyrics are never stored) · librosa · sentence-transformers · FRED", real:false},
];
window.PAPERS = [
  {y:"Working paper", t:"Heterogeneous Monetary Policy Transmission in Segmented Credit Markets: The Role of Caste in India", repo:"caste-monetary-transmission",
   p:"A 34-state panel from 2011 to 2025 testing whether caste-linked financial exclusion weakens how RBI repo rate changes pass through to credit. It introduces a 'wasted multiplier' of about 0.81 pp at the average SC/ST share, drawing on TANK and HANK models. The replication package adds a wild cluster bootstrap, randomisation inference and leave-one-state-out checks.",
   m:"Python · two-way FE · continuous-treatment DiD"},
  {y:"Working paper", t:"Inequality and the Multiplier: Post-Keynesian Lessons for Fiscal Policy in India",
   p:"Does rising inequality, measured by the Palma ratio, weaken fiscal multipliers in India? Annual data from 1990 to 2023, read through Kaldor-Pasinetti and Hein-Stockhammer distribution theory.",
   m:"OLS · interaction modelling · Newey-West · Stata · R"},
  {y:"Working paper", t:"Trial, Trust, and Subscription: Learning and Risk in India's Streaming Market",
   p:"A survey of 150 Gen Z streaming users, combining expected utility, Bayesian learning and CARA risk aversion. Trial length and perceived quality turn out to drive willingness to pay.",
   m:"Logit · Bayesian simulation · Python · Stata"},
  {y:"BA (Hons.) dissertation · 2023", t:"The Market Positioning of Tata Motors: Consumer Behaviour and Choice",
   p:"A survey of 167 buyers looking at what drives preference and brand switching across Tata's vehicle segments.",
   m:"ANOVA · regression · survey design"},
  {y:"BA (Hons.) seminar paper · 2022", t:"Trans-Inclusive Advertising and the Lived Experience of Transgender Individuals in India",
   p:"Fifteen interviews and more than 100 surveys on how trans-inclusive advertising shapes self-perception, and on the gap between being visible in ads and any real change in people's lives.",
   m:"Mixed methods · thematic analysis"},
];

window.DESK = {
  rdBW: [[2,-9.17,2.69],[3,-9.77,2.24],[5,-11.23,1.76],[7.5,-11.66,1.47],[10,-11.59,1.29]],
  caste: {b:-0.0227, lo:-0.0355, hi:-0.0096, mean:35.5},
};

/* headline stat + plain-language line for each project */
window.VIEWS = {
  "caste-monetary-transmission": {stat:"0.81 pp", statLab:"the 'wasted multiplier' at the average state", words:"When the RBI moves rates, credit in states with larger SC/ST populations responds differently from credit elsewhere. Who has access to formal finance shapes who monetary policy actually reaches."},
  "anti-incumbency-india": {stat:"−11 pp", statLab:"change in a party's chance of holding a seat it narrowly won", words:"Winning a close state election makes a party less likely to hold the seat next time, not more. Voters seem to judge the party in power, not the person."},
  "hit-half-life": {stat:"37%", statLab:"of streaming-era Top 40 hits last a single week (3% before 1991)", words:"Streaming didn't kill the long-running hit. It split the charts into songs that vanish in a week and songs that stay for months."},
  "fed-behind-the-curve": {stat:"3 qtrs", statLab:"how late the Fed raised rates, judged by its own pre-2020 behaviour", words:"By the standards of its own past behaviour, the Fed was late to raise rates in 2021, though not nearly as late as the textbook rules suggest."},
  "burgernomics": {stat:"1.04×", statLab:"forecast error of the best model relative to guessing 'no change'", words:"If a currency looks cheap in burgers, it usually stays cheap. Local burger prices catch up instead, and nothing beats simply guessing that exchange rates won't move."},
  "ipl-hot-hand": {stat:"+1.5 pp", statLab:"extra boundary chance after the bowler has just been hit", words:"The batter's hot hand is mostly an illusion. What momentum there is belongs to a rattled bowler."},
  "hosting-dividend": {stat:"0 / 11", statLab:"hosts with a clear economic gain from their mega-event", words:"Hosting the Olympics or a World Cup doesn't reliably make a country richer, and the Delhi Commonwealth Games were no exception."},
  "say-sound-gap": {stat:"soon", statLab:"results arrive when the audio pipeline finishes its first run", words:"Some songs sound happy while saying something sad. This measures that gap across 65 years of hits, and asks whether it moves with the economy."},
};

window.TIMELINE = [
  {row:"Education", s:2019.55, e:2023.4, t:"BA (Hons.) Liberal Arts", o:"Symbiosis School for Liberal Arts, Pune"},
  {row:"Education", s:2025.55, e:2027.4, t:"MSc Economics (Data Analytics)", o:"Symbiosis School of Economics, Pune"},
  {row:"Work", s:2023.42, e:2023.95, t:"Marketing Associate", o:"Garuda Insurance Broker, Gurugram"},
  {row:"Work", s:2023.92, e:2025.12, t:"Marketing Officer", o:"Kaizen Pharmaceuticals, Chandigarh"},
  {row:"Work", lane:1, s:2024.0, e:2026.75, t:"Freelance Marketing Consultant", o:"Restaurants, cafés and NGOs"},
  {row:"Internships", s:2021.83, e:2022.45, t:"Social Media Marketing Analyst Intern", o:"Embtel Solutions"},
  {row:"Internships", s:2022.42, e:2022.55, t:"Marketing and Business Development Intern", o:"DLF Home Developers"},
  {row:"Internships", lane:1, s:2022.5, e:2022.63, t:"Trainee", o:"EY"},
  {row:"Internships", s:2026.33, e:2026.66, t:"Market Research Intern", o:"HKRP Innovations"},
];
window.SKILLMAP = {
  "Python": ["caste-monetary-transmission","anti-incumbency-india","hit-half-life","fed-behind-the-curve","burgernomics","ipl-hot-hand","hosting-dividend","say-sound-gap"],
  "Stata": ["caste-monetary-transmission"],
  "Causal inference": ["caste-monetary-transmission","anti-incumbency-india","hosting-dividend","ipl-hot-hand"],
  "Forecasting": ["fed-behind-the-curve","burgernomics","hit-half-life"],
  "Machine learning": ["hit-half-life","fed-behind-the-curve","burgernomics","ipl-hot-hand","say-sound-gap"],
  "Survival analysis": ["hit-half-life"],
  "NLP and audio": ["say-sound-gap"],
  "Survey research": [],
};

