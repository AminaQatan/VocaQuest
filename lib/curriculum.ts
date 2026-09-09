export type Question = {kind:'choice'|'fill'|'short'|'truefalse'|'order'|'spell'|'dictation'|'listen'|'read';focus?:'Vocabulary'|'Grammar'|'Listening'|'Reading';skill?:'Synonyms'|'Antonyms';prompt:string;options?:string[];answer:string;acceptedAnswers?:string[];why:string;passage?:string};
export type Unit = {id:number;title:string;world:string;icon:string;color:string;goal:string;lead:string;grammar:{rule:string;example:string}[];vocab:[string,string][];reading:string;listening:string;writing:string;keywords:string[];questions:Question[]};
const q=(prompt:string,options:string[],answer:string,why:string):Question=>({kind:'choice',prompt,options,answer,why});
const f=(prompt:string,answer:string,why:string):Question=>({kind:'fill',prompt,answer,why});
const short=(prompt:string,answer:string,why:string):Question=>({kind:'short',prompt,answer,why});
const t=(prompt:string,answer:boolean,why:string):Question=>({kind:'truefalse',prompt,options:['True','False'],answer:answer?'True':'False',why});
const o=(prompt:string,answer:string):Question=>({kind:'order',prompt,options:answer.split(' '),answer,why:'Correct order: '+answer});
const l=(passage:string,prompt:string,options:string[],answer:string,why:string):Question=>({kind:'listen',passage,prompt,options,answer,why});
const r=(passage:string,prompt:string,options:string[],answer:string,why:string):Question=>({kind:'read',passage,prompt,options,answer,why});
export const units:Unit[]=[
{id:1,title:'Machines and Tools',world:'Tool Detective',icon:'Wrench',color:'#258c6c',goal:'Name tools, explain their uses and describe where they are.',lead:'Look at the workshop in the adventure picture. Which tools do you already know?',grammar:[{rule:'Use to + base verb to explain a purpose.',example:'We use a hammer to drive nails.'},{rule:'Use prepositions to say where something is.',example:'The spanner is on the workbench.'},{rule:'Join ideas with and, but or because.',example:'I wear gloves because they protect my hands.'}],vocab:[['hammer','to drive nails into wood'],['hacksaw','to cut metal'],['spanner','to tighten or loosen nuts'],['screwdriver','to tighten or loosen screws'],['drill','to make holes'],['measuring tape','to measure length'],['T-square','to draw horizontal lines'],['compass','to draw circles'],['drawing board','a flat surface for technical drawing'],['set square','to draw angles and straight lines'],['anchor','to hold a boat in position'],['net needle','to make or repair fishing nets']],reading:'Salim is a new student in the interior design workshop. There is a large drawing board near the window. A T-square is on the board, and a compass is in a small box. Salim uses the T-square to draw horizontal lines. He uses the compass to draw circles. His trainer checks the drawing and asks him to measure each line carefully. Salim likes the workshop because he can turn an idea into a clear plan. Before leaving, he puts the tools back in their places.',listening:'Trainer: Welcome to the workshop, Salim. The screwdriver is in the blue box. Use it to tighten the screws. Student: Where is the measuring tape? Trainer: It is on the workbench, next to the hammer. Measure the wood before you begin.',writing:'Write two lines about the tool workshop. Name tools, say where they are, and explain one use.',keywords:['tool','hammer','spanner','screwdriver','workshop','board','saw','bench','drill'],questions:[
q('Which tool do we use to tighten screws?',['hammer','screwdriver','compass','anchor'],'screwdriver','A screwdriver fits the head of a screw.'),
q('We use a hacksaw to …',['cut metal','draw circles','measure length','hold a boat'],'cut metal','A hacksaw has a blade for cutting metal.'),
f('We use a drill ___ make holes.','to','Use to + base verb for purpose.'),
t('A compass is used to draw circles.',true,'A drawing compass draws circles.'),
q('The spanner is ___ the workbench. It is resting on its surface.',['under','behind','on','between'],'on','On means touching the top surface.'),
o('Build a sentence about purpose.','We use a hammer to drive nails'),
q('I wear gloves ___ they protect my hands.',['but','because','or','on'],'because','Because introduces a reason.'),
l('The screwdriver is in the blue box. The measuring tape is on the workbench.','Where is the screwdriver?',['in the blue box','on the workbench','under the chair'],'in the blue box','The trainer says it is in the blue box.'),
r('Salim uses a T-square to draw horizontal lines and a compass to draw circles.','What does Salim use for horizontal lines?',['a compass','a T-square','a net needle'],'a T-square','The text links the T-square with horizontal lines.'),
short('What holds a boat in position? Write one word.','anchor','An anchor keeps a boat in position.'),
q('Which tool measures length?',['measuring tape','hammer','screwdriver'],'measuring tape','A measuring tape shows distance or length.'),
t('A spanner is used to draw circles.',false,'A spanner tightens or loosens nuts.'),
q('A net needle is used to …',['repair fishing nets','cut a pipe','measure a room'],'repair fishing nets','A net needle carries twine for making or repairing nets.'),
f('The tools are useful ___ they are expensive.','but','But joins contrasting ideas.'),
o('Put the words in order.','The compass is on the drawing board')
]},
{id:2,title:'Actions in Workshops',world:'Workshop in Action',icon:'Hammer',color:'#348bab',goal:'Describe what people are doing using the present continuous.',lead:'Imagine you are entering a busy workshop. What are the students doing now?',grammar:[{rule:'Present continuous: am / is / are + verb-ing.',example:'The technician is repairing a machine.'},{rule:'Use not to make a negative.',example:'They are not painting the wall.'},{rule:'Begin questions with am, is or are.',example:'Is she measuring the wood?'},{rule:'There is + singular; there are + plural.',example:'There are three students in the workshop.'}],vocab:[['measuring','finding the size or length'],['drilling','making a hole with a drill'],['painting','covering a surface with paint'],['repairing','making something work again'],['wiring a plug','connecting wires to a plug'],['changing a wheel','replacing a wheel'],['reading instructions','checking what to do'],['turning on','starting a machine'],['talking to the trainer','speaking with the teacher'],['fixing the AC','repairing an air conditioner']],reading:'It is nine o’clock in the workshop. The students are working in pairs. Noor is measuring a piece of wood while Huda is writing the measurements. Near the door, two students are painting a small table. They are wearing protective clothes. The trainer is talking to another group about a drawing. There are tools on each workbench, but the floor is clear. Everyone is busy. The students are learning practical skills and using English to explain their actions to their partners.',listening:'There are four students in the workshop. Ali is changing a wheel. Noor is reading the instructions. Huda and Salim are painting a door. The trainer is checking their work. Nobody is using the drill at the moment.',writing:'Write two lines about the workers in the picture. Describe their actions using is / are + verb-ing.',keywords:['measuring','painting','repairing','working','drilling','reading','changing','drawing','carrying'],questions:[
q('The technician ___ repairing the AC.',['am','is','are'],'is','The technician is singular, so use is.'),
f('They ___ painting a door now.','are','Use are with they.'),
q('Choose the correct sentence.',['She measuring the wood.','She is measuring the wood.','She are measuring the wood.'],'She is measuring the wood.','Use subject + is + verb-ing.'),
t('“He is not drilling” is a negative sentence.',true,'Not makes the sentence negative.'),
o('Build a present continuous sentence.','The students are reading the instructions'),
q('___ there two workbenches in the room?',['Is','Are','Am'],'Are','Two workbenches is plural.'),
f('There ___ a drill on the bench.','is','Use there is for one thing.'),
l('Ali is changing a wheel. Noor is reading the instructions.','What is Noor doing?',['reading instructions','changing a wheel','painting a wall'],'reading instructions','Noor is reading the instructions.'),
r('Noor is measuring wood while Huda is writing the measurements.','Who is writing?',['Noor','Huda','the trainer'],'Huda','Huda is writing the measurements.'),
q('Which question is correct?',['Is she painting?','She is painting? is','Are she painting?'],'Is she painting?','Put is before she in a question.'),
short('Which form of be goes with I in the present continuous?','am','Use am with I.'),
t('“There are a hammer” is correct.',false,'A hammer is singular: there is a hammer.'),
q('What is the -ing form of “write”?',['writeing','writing','writting'],'writing','Remove the final e before adding -ing.'),
o('Build a negative sentence.','They are not using the machine'),
q('The students are ___ a wheel.',['change','changes','changing'],'changing','After are, use the -ing form for an action now.')
]},
{id:3,title:'Hazards in Workshops',world:'Safety Mission',icon:'ShieldCheck',color:'#dc9650',goal:'Identify hazards and explain clear safety rules.',lead:'Look at the workshop scene. What should you check before starting work?',grammar:[{rule:'Use an imperative for a clear instruction.',example:'Wear safety glasses.'},{rule:'Use do not / don’t + base verb for a warning.',example:'Do not touch a moving machine.'},{rule:'Explain a reason with because.',example:'Keep the floor clear because someone may trip.'}],vocab:[['hazard','something that could cause harm'],['slippery','easy to slide on'],['trip','to catch your foot and lose balance'],['protective clothing','clothing that helps keep you safe'],['safety glasses','protection for your eyes'],['ear protectors','protection against loud noise'],['warning sign','a sign that shows possible danger'],['spill','liquid accidentally dropped'],['damaged cable','a wire covering that is broken'],['emergency exit','a way out in an emergency']],reading:'Before a lesson begins, the trainer checks the workshop. There is a bag beside the doorway and some water on the floor. The bag could make someone trip, and the wet floor is slippery. The trainer asks students to keep the exit clear and report the spill. She also notices a damaged cable. The students must not use the equipment until an authorised person has checked it. A safe workshop needs careful workers as well as clear signs. Everyone has a part to play.',listening:'Trainer: Stop for a moment. There is water near the door. Stay away from the wet area and tell the supervisor. Keep the emergency exit clear. Before drilling, put on safety glasses and follow the trainer’s instructions.',writing:'Write two lines about the safety zone. Identify a possible hazard and give a safety rule.',keywords:['safe','safety','wear','do not','don’t','hazard','floor','protect','careful','exit'],questions:[
q('Water on the floor can make it …',['slippery','quiet','sharp'],'slippery','A wet floor can cause a slip.'),
short('What protects your eyes? Write two words.','safety glasses','Safety glasses protect the eyes.'),
f('___ not touch a moving machine.','Do','Use Do not + base verb for a warning.'),
t('It is safe to block an emergency exit.',false,'Emergency exits must stay clear.'),
o('Build a safety rule.','Keep the workshop floor clear'),
q('A bag in a doorway is a ___ hazard.',['trip','hearing','heat'],'trip','Someone could catch a foot on the bag.'),
f('Wear ear protectors ___ the noise is loud.','because','Because explains the reason.'),
l('There is water near the door. Stay away from the wet area and tell the supervisor.','What should the student report?',['a water spill','a missing pen','a broken window'],'a water spill','The speaker warns about water near the door.'),
r('The trainer notices a damaged cable. Students must not use the equipment until it has been checked.','What should the students do?',['use it quickly','stop using it and report it','cover it with paper'],'stop using it and report it','Damaged equipment should be reported and checked.'),
q('Choose the correct warning.',['Not touching the machine.','Do not touch the machine.','Do not touches the machine.'],'Do not touch the machine.','Use the base verb after do not.'),
t('Ear protectors reduce exposure to loud noise.',true,'Ear protectors are used in noisy work areas.'),
f('Keep the emergency ___ clear.','exit','Everyone must be able to leave safely.'),
q('What is a hazard?',['a possible source of harm','a type of reward','a finished drawing'],'a possible source of harm','A hazard could cause harm.'),
o('Build an instruction.','Wear safety glasses in the workshop'),
q('Why should workers follow warning signs?',['to avoid possible harm','to decorate the room','to work without instructions'],'to avoid possible harm','Warning signs communicate possible dangers.')
]},
{id:4,title:'Past Events and Stories',world:'Time Traveller',icon:'Clock3',color:'#8870bd',goal:'Tell past events using past simple, past continuous and sequencing.',lead:'Think about a memorable day in a workshop. What happened first?',grammar:[{rule:'Past simple describes a completed past action.',example:'Yesterday, we visited a workshop.'},{rule:'Past continuous: was / were + verb-ing.',example:'I was drawing when the trainer arrived.'},{rule:'Use did not + base verb for negatives.',example:'He did not use the drill.'},{rule:'Sequence events clearly.',example:'First, we arrived. Then, we met the trainer.'}],vocab:[['yesterday','the day before today'],['last week','the week before this one'],['ago','before the present time'],['arrived','reached a place'],['noticed','became aware of something'],['while','during the time that'],['suddenly','quickly and unexpectedly'],['finally','after everything else'],['memorable','easy to remember'],['repaired','fixed something']],reading:'Last Tuesday, our class visited a carpentry workshop. First, the trainer showed us the tools. Then, we watched two workers make a table. One worker was measuring the wood while the other was checking a drawing. Suddenly, the lights went out. Everyone stopped working and waited calmly. A technician checked the problem. After that, the lights came on and the lesson continued. Finally, we asked the trainer some questions. It was a memorable visit because we learned about teamwork as well as tools.',listening:'Yesterday, Ali arrived at the workshop at eight o’clock. He was reading a drawing when his partner arrived. First, they measured the wood. Then, they checked the measurements with the trainer. Finally, they put their tools away.',writing:'Use the time-travel picture to imagine a past event. Write two lines using a past action and a sequence word.',keywords:['was','were','yesterday','visited','walked','arrived','went','then','finally','first'],questions:[
q('Yesterday, we ___ the workshop.',['visit','visited','visiting'],'visited','Visited is the past simple form of visit.'),
f('She ___ painting when the trainer arrived.','was','Use was + -ing with she.'),
q('They ___ measuring the wood at nine yesterday.',['was','were','are'],'were','Use were with they for the past continuous.'),
t('“He did not went” is correct.',false,'After did not, use the base form: go.'),
o('Build a past simple sentence.','We visited the workshop last week'),
q('Choose the past form of “go”.',['goed','went','gone'],'went','Went is the past simple form of go.'),
f('First, we measured. ___, we checked the drawing.','Then','Then introduces the next event.'),
l('Ali arrived at eight o’clock. He was reading a drawing when his partner arrived.','What was Ali doing when his partner arrived?',['reading a drawing','painting a door','changing a wheel'],'reading a drawing','Ali was reading a drawing.'),
r('The lights went out. Everyone stopped working and waited calmly.','What did the workers do when the lights went out?',['continued drilling','stopped working','ran outside'],'stopped working','The passage says everyone stopped working.'),
q('___ you visit the workshop yesterday?',['Do','Did','Are'],'Did','Use did to form a past simple question.'),
short('What is the base form of used?','use','Did not is followed by a base verb.'),
t('“While” can introduce an action in progress in the past.',true,'For example: while I was working, the phone rang.'),
o('Build a past continuous sentence.','They were working in the workshop'),
q('Which word introduces the last event?',['finally','first','yesterday'],'finally','Finally introduces the last event.'),
q('The past form of “make” is …',['maked','made','making'],'made','Made is the irregular past simple form.')
]},
{id:5,title:'Made in Oman',world:'Made in Oman Quest',icon:'Gem',color:'#bc7750',goal:'Explore Omani products, their materials and how they are made.',lead:'Look at the pottery market and dhow in the picture. Which Omani products do you recognise?',grammar:[{rule:'Present passive: is / are + past participle.',example:'Pottery is made from clay.'},{rule:'Use made of when the material remains recognisable.',example:'The bracelet is made of silver.'},{rule:'Use made from when a material is transformed.',example:'Cement is made from raw materials.'}],vocab:[['frankincense','an aromatic resin from a tree'],['resin','a sticky substance produced by some trees'],['pottery','objects made from clay'],['clay','soft earth used to make pottery'],['kiln','a special oven for firing pottery'],['silver','a metal used for jewellery'],['bracelet','jewellery worn around the wrist'],['sheath','a protective cover for a blade'],['export','to sell goods to another country'],['industry','the production of goods'],['cement','a material used in building'],['dhow','a traditional sailing boat']],reading:'Oman produces both traditional crafts and modern industrial goods. Pottery is made from clay. A pot is shaped and then fired in a kiln. Silver is used to make bracelets and other decorative items. Frankincense is a resin from trees that grow in Dhofar. The resin is collected and prepared for sale. Traditional boats are also part of Oman’s heritage. Today, factories produce building materials such as cement. These products show how practical skills connect local history with work in the modern economy.',listening:'Welcome to the pottery workshop. These bowls are made from clay. The clay is shaped on a wheel. The pots are left to dry and then fired in a kiln. Some visitors buy the finished pots as souvenirs.',writing:'Write two lines about the Omani market or dhow. Mention a product, its material and a use or production step.',keywords:['oman','omani','pottery','clay','silver','boat','dhow','frankincense','made','pot'],questions:[
q('Pottery is made from …',['clay','glass','paper'],'clay','Clay is shaped and fired to make pottery.'),
f('The bracelet is made of ___.','silver','Silver is a metal used for jewellery.'),
q('What is frankincense?',['a resin','a metal','a machine'],'a resin','Frankincense is an aromatic resin from trees.'),
t('A kiln is used to fire pottery.',true,'The high temperature helps make the pottery strong.'),
o('Build a passive sentence.','Pottery is made from clay'),
q('These products ___ exported to other countries.',['is','are','am'],'are','Products is plural, so use are.'),
short('What is the name of a traditional sailing boat?','dhow','Dhow is a word for a traditional sailing boat.'),
l('The bowls are made from clay. The clay is shaped on a wheel. The pots are fired in a kiln.','Where are the pots fired?',['in a kiln','in a fridge','in a boat'],'in a kiln','A kiln is the special oven used for pottery.'),
r('Frankincense is a resin from trees that grow in Dhofar.','Where do these frankincense trees grow?',['Dhofar','the workshop','the sea'],'Dhofar','The text names Dhofar.'),
q('To export means to …',['sell goods to another country','throw goods away','use goods at home'],'sell goods to another country','Exports are sold to other countries.'),
f('Silver ___ used to make bracelets.','is','Silver is uncountable here, so use is.'),
t('Cement is an example of a modern industrial product.',true,'Cement is produced for construction.'),
o('Build a sentence about a material.','The bracelet is made of silver'),
q('Which item is worn around the wrist?',['a bracelet','a sheath','a kiln'],'a bracelet','A bracelet is a piece of jewellery for the wrist.'),
q('Choose the passive sentence.',['Workers shape the clay.','The clay is shaped by workers.','The workers are shaping.'],'The clay is shaped by workers.','The passive uses is + past participle: shaped.')
]},
{id:6,title:'Instructions',world:'Master of Instructions',icon:'ListChecks',color:'#547bc2',goal:'Give clear step-by-step instructions with imperatives and sequence words.',lead:'How would you explain a simple task to a new student? What should they do first?',grammar:[{rule:'Start an instruction with a base verb.',example:'Measure the wood carefully.'},{rule:'Use sequence words to organise the steps.',example:'First, draw a plan. Next, measure the materials.'},{rule:'Use do not + base verb for a negative instruction.',example:'Do not skip the final check.'},{rule:'A process can also use the present passive.',example:'The pieces are joined together.'}],vocab:[['first','at the beginning'],['next','in the following step'],['after that','following the previous action'],['finally','in the last step'],['measure','find the size or length'],['mark','make a visible sign'],['cut','divide with a cutting tool'],['join','connect two or more things'],['check','make sure something is correct'],['prepare','make ready'],['assemble','put parts together'],['inspect','look at something carefully']],reading:'To make a simple paper model of a house, prepare some card, a ruler, a pencil and glue. First, draw a plan of the house. Next, measure and mark the walls on the card. Follow your teacher’s instructions to cut out the pieces safely. After that, fold the card along the marked lines. Join the walls with glue and add a roof. Finally, check that the model stands firmly. Do not rush. Clear measurements and careful work will help you make a neat model.',listening:'First, draw a plan for your paper house. Next, measure and mark the card. After that, cut and fold the pieces with your teacher’s guidance. Join the walls and add the roof. Finally, check your model.',writing:'Write two lines of instructions for a paper house model. Use sequence words such as First, Next and Finally.',keywords:['first','next','finally','measure','draw','join','check','fold','cut','mark'],questions:[
q('Choose the correct imperative.',['Measuring the card.','Measure the card.','Measures the card.'],'Measure the card.','An imperative starts with the base verb.'),
f('___, draw a plan. Next, measure the card.','First','First introduces the beginning of a process.'),
q('Which word introduces the next step?',['yesterday','next','because'],'next','Next signals the following step.'),
t('“Do not rush” is a negative imperative.',true,'Do not + base verb gives a negative instruction.'),
o('Build a clear instruction.','Measure the card with a ruler'),
f('Do not ___ the final check.','skip','Use the base verb after do not.'),
q('What does “assemble” mean?',['put parts together','take a break','describe the past'],'put parts together','Assemble means to join the parts of something.'),
l('First, draw a plan. Next, measure the card. Finally, check the model.','What is the last step?',['draw a plan','measure the card','check the model'],'check the model','Finally introduces checking the model.'),
r('Fold the card along the lines. Join the walls with glue and add a roof.','What is used to join the walls?',['glue','water','a compass'],'glue','The text says to join the walls with glue.'),
o('Build a negative instruction.','Do not skip the final check'),
q('The pieces ___ joined together.',['is','are','am'],'are','Pieces is plural: are joined.'),
short('Which sequence word introduces the last step?','Finally','Finally signals the last step.'),
t('Good instructions should have a clear order.',true,'A clear order helps someone complete the task.'),
q('Which instruction tells you to make something ready?',['Prepare the materials.','Forget the materials.','Describe yesterday.'],'Prepare the materials.','Prepare means make ready.'),
q('Choose the best order for a paper model.',['check → glue → plan','plan → measure → assemble → check','assemble → plan → measure'],'plan → measure → assemble → check','Plan first and check the finished model last.')
]}
];

const extraQuestions:Question[][]=[
 [
  {kind:'truefalse',focus:'Reading',prompt:'Salim keeps his compass in a small box.',options:['True','False'],answer:'True',why:'The text says the compass is in a small box.'},
  {kind:'read',focus:'Reading',prompt:'Where is the drawing board? Give a short answer.',answer:'near the window',acceptedAnswers:['by the window','next to the window'],why:'The drawing board is near the window.'},
  {kind:'choice',focus:'Vocabulary',skill:'Synonyms',prompt:'Which word means the same as “repair”?',options:['fix','break','measure'],answer:'fix',why:'Repair and fix both mean to make something work again.'},
  {kind:'choice',focus:'Vocabulary',skill:'Antonyms',prompt:'What is the opposite of “tighten”?',options:['loosen','draw','hold'],answer:'loosen',why:'Tighten makes something firmer; loosen makes it less tight.'},
  {kind:'listen',focus:'Listening',prompt:'Which tool is next to the hammer? Write its name.',passage:'The screwdriver is in the blue box. The measuring tape is on the workbench, next to the hammer.',answer:'measuring tape',acceptedAnswers:['the measuring tape','tape measure','the tape measure'],why:'The measuring tape is next to the hammer.'},
  {kind:'dictation',focus:'Listening',prompt:'Listen and type the sentence.',passage:'The hammer is on the workbench.',answer:'The hammer is on the workbench.',why:'Check the words hammer, on and workbench.'},
  {kind:'spell',focus:'Vocabulary',prompt:'Unscramble the tool used to draw circles.',options:['c','o','m','p','a','s','s'],answer:'compass',why:'A compass is used to draw circles.'}
 ],
 [
  {kind:'truefalse',focus:'Reading',prompt:'Two students are painting a small table near the door.',options:['True','False'],answer:'True',why:'The passage describes two students painting a small table.'},
  {kind:'read',focus:'Reading',prompt:'Who is measuring the wood? Write the name.',answer:'Noor',why:'Noor is measuring while Huda writes the measurements.'},
  {kind:'choice',focus:'Vocabulary',skill:'Synonyms',prompt:'Which word means the same as “repairing”?',options:['fixing','breaking','carrying'],answer:'fixing',why:'Repairing and fixing both describe making something work again.'},
  {kind:'choice',focus:'Vocabulary',skill:'Antonyms',prompt:'What is the opposite action to “turning on”?',options:['turning off','switching on','starting'],answer:'turning off',why:'Turning off stops a machine or its power.'},
  {kind:'listen',focus:'Listening',prompt:'What is Ali changing? Write one word.',passage:'Ali is changing a wheel. Noor is reading the instructions. Huda is painting a door.',answer:'wheel',acceptedAnswers:['a wheel','the wheel'],why:'Ali is changing a wheel.'},
  {kind:'dictation',focus:'Listening',prompt:'Listen and type the sentence.',passage:'The students are painting a door.',answer:'The students are painting a door.',why:'Use are painting to describe the action now.'},
  {kind:'spell',focus:'Vocabulary',prompt:'Unscramble the action of covering a surface with colour.',options:['p','a','i','n','t','i','n','g'],answer:'painting',why:'Painting means covering a surface with paint.'}
 ],
 [
  {kind:'truefalse',focus:'Reading',prompt:'The students can use the equipment with a damaged cable immediately.',options:['True','False'],answer:'False',why:'The equipment must be checked by an authorised person first.'},
  {kind:'read',focus:'Reading',prompt:'What makes the floor slippery? Write one word.',answer:'water',why:'There is water on the floor.'},
  {kind:'choice',focus:'Vocabulary',skill:'Synonyms',prompt:'Which word is closest in meaning to “hazard”?',options:['danger','reward','drawing'],answer:'danger',why:'A hazard is a possible source of danger or harm.'},
  {kind:'choice',focus:'Vocabulary',skill:'Antonyms',prompt:'What is the opposite of “safe”?',options:['dangerous','careful','protected'],answer:'dangerous',why:'Dangerous means involving a risk of harm.'},
  {kind:'listen',focus:'Listening',prompt:'Who should students tell about the spill? Write the job title.',passage:'There is a spill near the door. Stay away from the wet area and tell the supervisor.',answer:'supervisor',acceptedAnswers:['the supervisor'],why:'The instruction is to tell the supervisor.'},
  {kind:'dictation',focus:'Listening',prompt:'Listen and type the safety instruction.',passage:'Keep the emergency exit clear.',answer:'Keep the emergency exit clear.',why:'Keep is the imperative; emergency exit is the way out.'},
  {kind:'spell',focus:'Vocabulary',prompt:'Unscramble the word for something that could cause harm.',options:['h','a','z','a','r','d'],answer:'hazard',why:'A hazard could cause harm.'}
 ],
 [
  {kind:'truefalse',focus:'Reading',prompt:'The class visited the workshop last Tuesday.',options:['True','False'],answer:'True',why:'The first sentence names last Tuesday.'},
  {kind:'read',focus:'Reading',prompt:'Who checked the problem with the lights? Write the job title.',answer:'technician',acceptedAnswers:['a technician','the technician'],why:'A technician checked the problem.'},
  {kind:'choice',focus:'Vocabulary',skill:'Synonyms',prompt:'Which phrase means “memorable”?',options:['easy to remember','easy to forget','very ordinary'],answer:'easy to remember',why:'A memorable event stays in your memory.'},
  {kind:'choice',focus:'Vocabulary',skill:'Antonyms',prompt:'What is the opposite of “arrived”?',options:['left','reached','came'],answer:'left',why:'Arrived means reached a place; left means went away.'},
  {kind:'listen',focus:'Listening',prompt:'When did Ali arrive? Write the time in words.',passage:'Yesterday, Ali arrived at eight o’clock. He read the drawing and then measured the wood.',answer:"eight o'clock",acceptedAnswers:['eight','at eight',"at eight o'clock"],why:'Ali arrived at eight o’clock.'},
  {kind:'dictation',focus:'Listening',prompt:'Listen and type the sentence.',passage:'We visited the workshop yesterday.',answer:'We visited the workshop yesterday.',why:'Visited is a past simple verb and yesterday is a past time word.'},
  {kind:'spell',focus:'Vocabulary',prompt:'Unscramble the word meaning “the day before today”.',options:['y','e','s','t','e','r','d','a','y'],answer:'yesterday',why:'Yesterday means the day before today.'}
 ],
 [
  {kind:'truefalse',focus:'Reading',prompt:'Pottery is made from silver.',options:['True','False'],answer:'False',why:'Pottery is made from clay; silver is used for jewellery.'},
  {kind:'read',focus:'Reading',prompt:'Where is a pot fired? Write the place.',answer:'in a kiln',acceptedAnswers:['kiln','a kiln','in the kiln','the kiln'],why:'A shaped pot is fired in a kiln.'},
  {kind:'choice',focus:'Vocabulary',skill:'Synonyms',prompt:'Which word is closest in meaning to “products”?',options:['goods','workers','prices'],answer:'goods',why:'Products and goods are things made for use or sale.'},
  {kind:'choice',focus:'Vocabulary',skill:'Antonyms',prompt:'What is the opposite of “modern”?',options:['ancient','recent','new'],answer:'ancient',why:'Modern relates to the present; ancient relates to the distant past.'},
  {kind:'listen',focus:'Listening',prompt:'What are the bowls made from? Write one word.',passage:'These bowls are made from clay. They are shaped on a wheel and fired in a kiln.',answer:'clay',why:'The speaker says the bowls are made from clay.'},
  {kind:'dictation',focus:'Listening',prompt:'Listen and type the sentence.',passage:'Pottery is made from clay.',answer:'Pottery is made from clay.',why:'Is made is the passive form.'},
  {kind:'spell',focus:'Vocabulary',prompt:'Unscramble the word for objects made from clay.',options:['p','o','t','t','e','r','y'],answer:'pottery',why:'Pottery is made by shaping and firing clay.'}
 ],
 [
  {kind:'truefalse',focus:'Reading',prompt:'The walls of the paper house are joined with glue.',options:['True','False'],answer:'True',why:'The passage says to join the walls with glue.'},
  {kind:'read',focus:'Reading',prompt:'What should you draw first? Give a short answer.',answer:'a plan',acceptedAnswers:['plan','a plan of the house','a house plan'],why:'First, draw a plan of the house.'},
  {kind:'choice',focus:'Vocabulary',skill:'Synonyms',prompt:'Which phrase means “assemble”?',options:['put together','take apart','throw away'],answer:'put together',why:'Assemble means to put the parts together.'},
  {kind:'choice',focus:'Vocabulary',skill:'Antonyms',prompt:'What is the opposite of “first”?',options:['last','next','before'],answer:'last',why:'First begins an ordered process; last ends it.'},
  {kind:'listen',focus:'Listening',prompt:'What should you check at the end? Write one word.',passage:'First, draw a plan. Next, measure the card. Finally, check the model.',answer:'model',acceptedAnswers:['the model','your model'],why:'The last instruction is to check the model.'},
  {kind:'dictation',focus:'Listening',prompt:'Listen and type the instruction.',passage:'First, measure the card carefully.',answer:'First, measure the card carefully.',why:'First introduces the step; measure is the imperative.'},
  {kind:'spell',focus:'Vocabulary',prompt:'Unscramble the word that introduces the final step.',options:['f','i','n','a','l','l','y'],answer:'finally',why:'Finally introduces the last step.'}
 ]
];
const vocabularyIndexes=[[0,1,3,9,10,11,12],[14],[0,1,3,5,10,11,12,14],[5,14],[0,1,2,3,6,9,11,13],[6,13]];
units.forEach((unit,i)=>{
 unit.questions.forEach((question,j)=>{question.focus=question.kind==='read'?'Reading':question.kind==='listen'?'Listening':vocabularyIndexes[i].includes(j)?'Vocabulary':'Grammar';});
 extraQuestions[i].forEach(question=>{if(question.focus==='Reading'&&!question.passage)question.passage=unit.reading;unit.questions.push(question);});
});
export function selectQuestionIds(unit:Unit,count:number){
 const shuffle=(items:number[])=>{for(let i=items.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[items[i],items[j]]=[items[j],items[i]]}return items};
 const all=shuffle(unit.questions.map((_,i)=>i));if(count>=all.length)return all;
 const selected:number[]=[];
 const add=(test:(q:Question)=>boolean)=>{if(selected.length>=count||selected.some(i=>test(unit.questions[i])))return;const id=all.find(i=>!selected.includes(i)&&test(unit.questions[i]));if(id!==undefined)selected.push(id)};
 if(count>=10){
  add(q=>q.kind==='dictation');add(q=>q.kind==='spell');add(q=>q.kind==='order');add(q=>q.kind==='listen');add(q=>q.kind==='read');add(q=>q.kind==='truefalse');add(q=>q.kind==='short');add(q=>q.focus==='Grammar'&&q.kind==='choice');add(q=>q.skill==='Synonyms');add(q=>q.skill==='Antonyms');
 }else{for(const focus of ['Vocabulary','Grammar','Listening','Reading'])add(q=>q.focus===focus);}
 for(const id of all){if(selected.length>=count)break;if(!selected.includes(id))selected.push(id)}return shuffle(selected);
}

export const modeCounts={quick:5,standard:10,extended:22} as const;
export type Mode=keyof typeof modeCounts;
export function normalise(s:string){return s.trim().toLowerCase().replace(/[.,!?;:]/g,'').replace(/[’]/g,"'").replace(/\s+/g,' ')}
export function isCorrect(q:Question,answer:string){return [q.answer,...(q.acceptedAnswers||[])].some(value=>normalise(answer)===normalise(value))}
export function marks(score:number){return score>=95?10:Math.round(score)/10}
