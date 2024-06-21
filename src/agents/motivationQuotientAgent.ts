// import { BaseMessage } from '@langchain/core/messages';
// import {
//   ChatPromptTemplate,
//   MessagesPlaceholder,
// } from '@langchain/core/prompts';
// import { RunnableSequence } from '@langchain/core/runnables';
// import { StringOutputParser } from '@langchain/core/output_parsers';
// import type { StreamEvent } from '@langchain/core/tracers/log_stream';
// import eventEmitter from 'events';
// import type { BaseChatModel } from '@langchain/core/language_models/chat_models';
// import type { Embeddings } from '@langchain/core/embeddings';
// import logger from '../utils/logger';

// const MQAssistantPrompt = `
// You are Perplexica, an AI model who is expert at searching the web and answering user's queries. You are currently set on focus mode 'Motivation Quotient Assistant', this means you will be answering the user's questions about motivation quotient in general and understanding their MQ scores. 
// Since you are a MQ assistant, you would not perform web searches. If you think you lack information to answer the query, you can ask the user for more information or suggest them to switch to a different focus mode. 
// `;

// const MQHandbook = [
//   {role: "user", content: `Why is the Motivation Quotient (MQ) the key to success in the 21st century?`},
//   {role: "assistant", content: `Throughout history and across the world, many have pursued success, but few have achieved it. In the 20th century, the West introduced the Intelligence Quotient (IQ) from an eugenics perspective, considering intelligence as a crucial indicator of success. However, long-term studies found that IQ could only roughly outline individual performance in specific areas and could not be a complete reference for success or measure an individual's development within a group.
//   It wasn't until the early 1990s that American psychologist Peter Salovey introduced Emotional Quotient (EQ), the ability to recognize, understand, and manage emotions, suggesting that EQ played a significant role in people's performance and environmental adaptation. However, many famous historical figures, such as politicians, scientists, artists, and entrepreneurs, often had poor emotional control, bad interpersonal relationships, and were difficult to get along with, which relatively reduced the importance of EQ in the formula for success.

//   In reality, what truly successful people rely on is nothing more than a clear mind, a steadfast motivation, and a passion that never gives up. Once these are in place, the results of learning are not just scores and rankings, work becomes more than just salary and titles, life ideals are energized, and the true outline of success can be gradually sketched out. Now, Equalearning has combined decades of research in motivational psychology with valuable experiences from education experts and business elites, and the big data from AI to find the key to people's success - the Motivation Quotient (MQ).

//   MQ enables people to deeply understand themselves in the shortest time, grasp their motivation distribution, determine their development direction, and conduct comprehensive group analysis to create core team values and find suitable partners. What are you waiting for? Let's enter the field of MQ and embark on a journey of self-discovery and success together!

//   `},
//   {role: "user", content: `What is Motivation DNA?`},
//   {role: "assistant", content: `Motivation DNA® is the ultimate tool designed to help people find their intrinsic motivation (passion). There are 30 Motivation DNAs, which are the most important dimensions (axes) for analyzing the intrinsic motivations driving individual behavior. Its revolutionary uniqueness lies in the scientific research methods used to identify and quantify "motivation," different from the general ability, personality, or psychological tests' inductive methods.
//   Everyone has the aforementioned 30 Motivation DNAs, and the numbers that measure each DNA's strength are called the Motivation Quotient (MQ). MQ is similar to yet different from IQ, wherein the IQ has one dimension and one intensity, while MQ has different intensities across 30 dimensions. This indicates that each individual's Motivation DNA strength is unique, as no one in the world has the same combination of these strengths, akin to a multi-dimensional universe with 30 dimensions.

//   In a large population, people with similar passions will cluster like galaxies or star clusters, statistically known as the clustering effect, which is the data analysis method used by MQ.

//   `},
//   {role: "user", content: `What is the connection between MQ, motivation, and passion?`},
//   {role: "assistant", content: `We often hear about "passion," but what is passion? Passion is liking something and having the motivation to do it. MQ measures motivation to find what you like and have passion for. For example, why do many people want to travel abroad during vacations? Because they want to spend time with family and friends, enjoy foreign cuisine, and see beautiful scenery. These "reasons" are our intrinsic motivations to travel, fueling our "passion" for traveling. Consequently, we take "action," such as actively searching for information online, learning foreign languages, and saving for the trip. Therefore, all actions and changes originate from our "intrinsic motivation."
//   `},
//   {role: "user", content: `What is the use of motivation (passion)?`},
//   {role: "assistant", content: `Motivated students will proactively learn and be driven to persistently complete tasks. Conversely, lacking or having weak motivation makes it challenging to take action, and even if actions are taken, they often lack persistence and resilience.
//   `},
//   {role: "user", content: `Application of motivation in education:`},
//   {role: "assistant", content: `Motivation is the navigator of people's achievements. Bringing the concept of "motivation" into the field of education can enable students to learn happily and effectively in ways that suit their talents and personalities. Motivation is like a locomotive, driving further interest, cultivating soft skills (potential abilities), and providing a continuous source of energy for building skills and competencies! Parents and teachers only need to help children find their inner locomotive and provide necessary assistance. The children will then transform into self-motivated locomotives. The stronger the motivation, the higher the enthusiasm, and the greater the drive, eliminating the need for adults to exhaust themselves cheering from behind.
//   `},
//   {role: "user", content: `Application of motivation in business:`},
//   {role: "assistant", content: `Applying motivation in the workplace can encourage employees to be proactive and strive for excellence. When employees engage in work that interests them, that they like and are passionate about, they are more likely to pursue better results more efficiently. This makes management easier for supervisors and leaders, leading to higher profits for the company. The application of motivation in businesses and the workplace will be discussed in more detail in subsequent chapters, especially the advanced analyses provided by the "Motivation Quotient Platform" (MQ Platform).
//   `},
//   {role: "user", content: `Application of motivation in relationships:`},
//   {role: "assistant", content: `Motivation can be used to handle "relationships," which commonly include parent-child, family, marital, and even group relationships. The Motivation Quotient (MQ) or motivation science is based on two principles: closeness and distance. The principle of closeness simply means that if people have high-intensity (MQ values greater than 70) Motivation DNA, they are more likely to have similar thoughts in this dimension, making cooperation or closeness easier. On the other hand, the principle of distance suggests that when the difference in Motivation DNA between individuals is greater than 40, they may find it difficult to communicate or may even argue over the corresponding Motivation DNA. Since each person's MQ combination is unique, improving relationships simply means communicating using the Motivation DNA that brings people closer together and respecting each other's differences with empathy.
//   `},
//   {role: "user", content: `What are the MQ values and their impacts?`},
//   {role: "assistant", content: `MQ > 70 is considered high intensity (liked); the higher the value, the stronger the motivation, and the more pronounced the characteristics described by the Motivation DNA. MQ < 30 is considered low intensity (disliked); the lower the value, the weaker the motivation, and the less one likes the characteristics described by the Motivation DNA. Values between 30 and 70 are flexible, and people's motivation intensity may change due to past experiences or their surrounding environment.
//   `},
//   {role: "user", content: `What are the 30 Motivation DNAs?`},
//   {role: "assistant", content: `The 30 Motivation DNAs are Ingenuity, Pioneering Independence, Exploration, Analytical Curiosity, Inquisitive Curiosity, Intellectual Independence, Beauty, Creativity, Sensibility, Prestige, Creative Curiosity, Teamworking, Altruism, Contemplation, Systematic, Execution, Team Coordination, Justness, Administrative Order, Collector, Influence, Expedience, Methodical Order, Practicality, Physical Activity, Food & Eating, Recognition, Serenity, Competitiveness, and Family Relationships. Among these, Family Relationships, Food & Eating, Physical Activity, Recognition, Serenity, and Competitiveness are closely related to general life and are also known as Life Indexes. Notably, Recognition, Serenity, and Competitiveness, though independent, often have interrelated dynamics. We often see individuals with high values in Recognition and Competitiveness also having high values in the Serenity (stress level).
//   `},
//   {role: "user", content: `What is Inquisitive Curiosity?`},
//   {role: "assistant", content: `Inquisitive Curiosity is the motivation DNA for genuine curiosity about new, unknown, or unfamiliar things characterized by an enjoyment of the process and result of acquiring new knowledge, regardless of its practicality. People with this Motivation DNA are always finding new questions, constantly asking "why," which stimulates related thinking, exploration, research, and so on. This trait belongs to the "Innovator" category in the Motivation Map.
//   The higher the MQ value, such as above 70, the greater the curiosity for new and unknown things, and the more one purely enjoys the process and result of gaining new knowledge. Conversely, the lower the MQ value, such as below 30, the less one likes theoretical or abstract things, often asking questions like, "Why do I need to learn this? What's the use?" For those with low MQ values, it is recommended to start with hands-on, visible, and participatory activities to enhance motivation for learning new knowledge from a practical application perspective.

//   An example of a highly curious individual is Albert Einstein, one of the most famous scientists of modern times, who was passionate about exploring the origins of the universe and dedicated his life to the study of space and time. An example application of curiosity is as follows: Mark is a highly curious student who always asks many questions (why) while learning, sometimes relentlessly. If the teacher directly explains the problem-solving process without discussing the underlying knowledge principles or derivation formulas, Mark becomes frustrated because many of his questions remain unanswered. Such students have a curiosity about exploring unknown fields, and it is best for parents or teachers to appropriately guide their questioning to stimulate learning motivation rather than seeing it as troublesome.

//   `},
//   {role: "user", content: `What is Exploration?`},
//   {role: "assistant", content: `This Motivation DNA is characterized by broad and unconstrained thinking, especially when dealing with seemingly complex or interdisciplinary problems. People with this motivation DNA typically do not have fixed thinking patterns. Instead, their thinking varies according to the nature of the problem. This trait falls under the category of research and innovation.
//   The higher the MQ value, such as above 70, the more one exhibits nonlinear thinking and excels at handling seemingly complex or interdisciplinary issues. Conversely, the lower the MQ value, such as below 30, the less one likes broad or open-ended questions, and may feel unsure where to start. It is recommended to begin with smaller, well-defined problem areas, finding more orderly methods for learning or working from simpler aspects.

//   A representative of high Exploration is John von Neumann, a pioneer of modern computational theory and a trained and passionate mathematician. His interdisciplinary learning and thinking covered numerous fields, from computational theory and economics to neuroscience.

//   An example application of Exploration is as follows: John has a wide range of interests. In learning, he is willing to invest time and energy in any field he finds fun or interesting, whether or not it is part of the school curriculum. Once he feels he has learned enough, he moves on to the next intriguing problem. He also dislikes learning in a constrained environment.

//   `},
//   {role: "user", content: `What is Ingenuity?`},
//   {role: "assistant", content: `This Motivation DNA encourages people to think outside the box and make bold assumptions, considering various possibilities regardless of whether there is a clear logical structure. It involves thinking and solving problems from new perspectives and falls under the category of research and innovation.
//   The higher the MQ value, such as above 70, the more one can break free from existing frameworks, make bold assumptions, and consider various possibilities to think and solve problems from new angles. Conversely, the lower the MQ value, such as below 30, the less one likes trying to change. It is recommended to boldly think outside the box, re-examine problems, and be someone who does not self-limit.

//   A representative of high Ingenuity is Richard Feynman, the 1965 Nobel Prize in Physics laureate, who is a perfect example of Ingenuity. He is celebrated as a pioneer in the field of quantum computing and introduced the concept of nanotechnology. He also participated in the investigation of the Challenger Space Shuttle disaster, demonstrating the investigation results using a rubber band and a glass of ice water.

//   An example application of high Ingenuity is as follows: Charles is very flexible in both his studies and life. When faced with problems, he always adapts quickly, reacting and deciding rapidly. He does not stick to existing rules and dislikes following scripts arranged by others. He can view problems from different perspectives and has countless methods to deal with issues.

//   `},
//   {role: "user", content: `What is Pioneering Independence?`},
//   {role: "assistant", content: `This Motivation DNA emphasizes acting independently and pioneering, with a strong drive to avoid seeking advice or help during the process. People with this Motivation DNA are highly independent, self-directed, and exploratory, preferring to make decisions or complete tasks on their own. This trait belongs to the category of "Innovator" on the Motivation Map.
//   The higher the MQ value, such as above 70, the more one focuses on independent action and pioneering, desiring to make decisions or complete tasks alone without seeking advice or help. Conversely, the lower the MQ value, such as below 30, the less one enjoys learning or working alone. It is recommended for those with low MQ values to find study or work companions or join discussion groups to find areas of interest.

//   A representative of high Pioneering Independence is Marie Curie, the first person to win two Nobel Prizes and the only woman to do so, as well as the only person to win Nobel Prizes in two scientific fields (Chemistry and Physics). Faced with difficult challenges and unexpected competition, her self-reliance drove her continuous exploration and research of radioactive substances, eventually earning recognition for her scientific achievements, most of which she accomplished on her own.

//   An example application of high Pioneering Independence is as follows: Michael enjoys delving into things on his own. When encountering problems, he is not accustomed to collaborating with others for solutions. He doesn't like participating in team discussions or group learning and isn't comfortable with projects requiring a lot of teamwork. However, this allows him to focus more and achieve success in his studies or work.

//   `},
//   {role: "user", content: `What is Influence?`},
//   {role: "assistant", content: `This Motivation DNA drives people to express their ideas and creativity in a compelling and convincing manner, using their influence to promote their creativity. Individuals with this Motivation DNA typically showcase their learning or work results through various forms of communication, such as speech, writing, images, graphics, and all other methods that can effectively reach a wide audience. This trait falls under the category of "Producer" on the Motivation Map.
//   The higher the MQ value, such as above 70, the more adept one is at adapting, innovating, and giving core technologies and products new applications and outcomes. Conversely, the lower the MQ value, such as below 30, the less one enjoys expressing their opinions or influencing others in public. It is recommended to learn to express oneself through other means, such as writing or videos, or even through creative methods that do not require language but can convey ideas.

//   A representative of high Influence is Elon Musk, the founder of several high-tech companies like Tesla and SpaceX. He is known for actively and persuasively advocating for innovative technologies, including fully electric autonomous vehicles and Mars landers.

//   An example application of high Influence is as follows: Kevin is a natural leader with a lot of confidence and creativity, attracting people around him who like to follow his lead. He often shares his ideas with others, hoping to find like-minded individuals.

//   `},
//   {role: "user", content: `What is Expedience?`},
//   {role: "assistant", content: `This Motivation DNA makes people flexible, innovative, and adaptive in achieving specific goals. Individuals with this Motivation DNA usually acquire new knowledge in an agile manner, quickly solve problems, and ultimately achieve their goals. This trait falls under the category of "Producer" on the Motivation Map.
//   The higher the MQ value, such as above 70, the better one is at creating frameworks and plans, organizing and systematically executing tasks, and achieving final goals and outcomes. Conversely, the lower the MQ value, such as below 30, the less one likes rigid learning methods. It is recommended to use more dynamic or independent-thinking supplemental materials/learning methods.

//   A representative of high Expedience is Jeff Bezos, the founder and executive chairman of Amazon. After deciding to establish an online bookstore, he left his job at D.E. Shaw (an American investment management firm). On July 5, 1994, he founded Amazon in his garage. Amazon has since become the world's largest online retailer and provides highly efficient online services.

//   An example application of high efficiency and adaptability is as follows: Lucas focuses heavily on efficiency in both studying and working. He is flexible, adaptable, and able to use different methods to tackle various challenges and achieve his goals.

//   `},
//   {role: "user", content: `What is Methodical Order?`},
//   {role: "assistant", content: `This Motivation DNA is associated with skills in creating frameworks, planning development roadmaps and schedules, and executing tasks in an orderly manner. Individuals with high values in this Motivation DNA excel at using a top-down approach, setting long-term goals based on their understanding and insight into the big picture or high-level structures. This trait falls under the category of "Producer" on the Motivation Map.
//   The higher the MQ value, such as above 70, the more one focuses on the strengths of team members and overall efficiency, excelling at communicating with others and leveraging team strength and resources to achieve goals. Conversely, the lower the MQ value, such as below 30, the more one may feel overwhelmed by learning subjects or doing work with a lot of variability. It is recommended to return to more basic learning or working methods, using structured, step-by-step approaches to build a solid foundation before exploring other application areas or collaborating further with others.

//   A representative of high structure and order is Morris Chang, the founder, chairman, and CEO of TSMC (Taiwan Semiconductor Manufacturing Company). He proposed the then-controversial idea of pricing semiconductors ahead of the cost curve, sacrificing early profits to gain market share and achieve manufacturing volume, leading to greater long-term profits. By introducing this disruptive business model, he made TSMC the world's leading semiconductor foundry.

//   An example application of high Methodical Order is as follows: Forrest is more composed in his studies than his peers. When he was in college, he set a goal to become a successful high-tech entrepreneur. He not only chose to study at a business school but also arranged internships at high-tech companies during the summer and took a second foreign language course. All of this was executed step by step according to his timetable, aiming towards his set goal.

//   `},
//   {role: "user", content: `What is Teamworking?`},
//   {role: "assistant", content: `This Motivation DNA enjoys interacting with others or collaborating in teams. Individuals with this Motivation DNA typically achieve better results or perform better in teams and are willing to share their knowledge and insights with others. This trait falls under the category of "Integrator" on the Motivation Map.
//   The higher the MQ value, such as above 70, the better one is at expressing their ideas and creativity in an influential and engaging manner, driving the promotion of their advocated innovations. Conversely, the lower the MQ value, such as below 30, the more one prefers to solve problems alone. It is recommended to pay more attention to the opinions of other team members and communicate with them in every opportunity for team interaction.

//   A representative of high Teamworking is Mark Zuckerberg, co-founder and CEO of Meta (formerly Facebook). He used his expertise in computer programming to create a network environment that facilitates interpersonal communication.

//   An example application of high Teamworking is as follows: Candy performs exceptionally well in school, especially in group activities. She also prefers to study with companions, finding that discussing with others leads to more effective work and learning. Outside of class, she enjoys participating in various clubs, where she can showcase her talents with like-minded individuals, making her campus life and learning more vibrant and dynamic.

//   `},
//   {role: "user", content: `What is Practicality?`},
//   {role: "assistant", content: `This Motivation DNA emphasizes practical application, solid results, and clear goals. Individuals with this Motivation DNA focus on the practicality of new information and knowledge and whether it aligns with their goals. This trait falls under the "Producer" category on the Motivation Map.
//   The higher the MQ value, such as above 70, the more one prefers learning, research, and design with a focus on practical application, making thoughtful and decisive actions to achieve goals. Conversely, the lower the MQ value, such as below 30, the less one likes application-oriented learning. It is recommended to align ideas with reality and avoid unrealistic fantasies.

//   A representative of high Practicality is Lisa Su, the chair and CEO of Advanced Micro Devices (AMD). Since her appointment in 2014, her vision has made AMD one of the leading semiconductor companies globally. The company focuses on making the right technology investments, streamlining product lines, diversifying, and accelerating new technology development.

//   An example application of high Practicality is as follows: James, when choosing elective courses, considers not only whether the course matches his interests but also whether it will provide tangible benefits for his future. For example, he evaluates whether it will help him find his ideal job or if there are any extra costs involved. He does not blindly pursue unrealistic dreams but focuses on long-term goals.

//   `},
//   {role: "user", content: `What is Altruism?`},
//   {role: "assistant", content: `This Motivation DNA is oriented towards the well-being of others and the world at large. Individuals with this Motivation DNA aim to benefit the public and contribute to making the world a better place through their learning or work, which stimulates related thinking, exploration, research, and so on. This trait falls under the "Integrator" category on the Motivation Map.
//   The higher the MQ value, such as above 70, the more one focuses on learning, research, and design aimed at group welfare, with the goal of promoting human welfare and social progress. Conversely, the lower the MQ value, such as below 30, the less one considers learning to be a means of helping society, which may lead to disengagement from society and a lack of motivation in the learning process. It is recommended to read biographies of great people or stories of social figures' compassion to enhance future learning motivation.

//   A representative of high Altruism is Henry Ford, an American industrialist and founder of the Ford Motor Company. He developed the assembly line technique, which used a meticulously planned, sequential operating system to mass-produce automobiles, making cars affordable for everyone and significantly impacting the 20th century.

//   An example application of high Altruism is as follows: Benjamin studied applied mathematics in college. Although he was very talented, he felt unmotivated because he thought his mathematical knowledge couldn't be applied to help others. In his senior year, he discovered that his knowledge could be used to analyze the dynamic distribution of global ocean currents, which could be applied to research on mitigating the greenhouse effect. Without hesitation, he worked hard to enter a Ph.D. program, joining his professor's team to research global climate issues.


//   `},
//   {role: "user", content: `What is Administrative Order?`},
//   {role: "assistant", content: `This Motivation DNA drives individuals to plan meticulously, handle details with precision, and execute tasks efficiently. This trait falls under the "Administrator" category on the Motivation Map.
//   The higher the MQ value, such as above 70, the more one emphasizes the planning and accuracy of tasks, executing them step by step. Conversely, the lower the MQ value, such as below 30, the less one pays attention to details and may sometimes lose patience. It is recommended to use tools or technology in advance to help focus on details, such as setting reminders on a phone calendar to maintain attention to detail.

//   A representative of high Administrative Order is Nikola Tesla, the inventor of alternating current (AC). He had many innovative inventions, some of which are still considered advanced by modern standards and, if realized, would have had a profound impact on the technological progress of human civilization.

//   An example application of high Administrative Order is as follows: Jessica, when faced with important projects, always creates a comprehensive and detailed plan first and then executes it precisely according to the plan. Even if the project's requirements change or an emergency occurs, she doesn't immediately switch to a new method but instead reviews the original plan, makes appropriate adjustments based on the current situation, and then executes according to the updated plan.

//   `},
//   {role: "user", content: `What is Systematic?`},
//   {role: "assistant", content: `This Motivation DNA prefers to follow rules within traditional or systematic frameworks, demonstrating self-discipline, adherence to regulations, and methodical execution. Individuals with high values in this Motivation DNA appreciate established or emerging systems of norms. This trait falls under the "Practitioner" category on the Motivation Map.
//   The higher the MQ value, such as above 70, the better one can execute learning or work plans through effective methods, paying attention to detailed steps. Conversely, the lower the MQ value, such as below 30, the less one likes following rules, always wanting to challenge the norms. It is recommended to find a balance between freedom and rules, completing plans step-by-step.

//   A representative of high Systematic is Robert Dennard, the inventor of DRAM (Dynamic Random Access Memory). He meticulously documented the concept, thought process, experimental design, and results, creating a new chapter in computer history.

//   An example application of high Systematic is as follows: Ryan attended a highly disciplined high school where teachers and the administration helped students develop college plans. He was very willing and self-disciplined in following the school's designed plans, successfully entering his desired college program. However, upon entering college, he found it challenging to adapt to an environment that encouraged students to create their own study plans, as it lacked the fixed system he was used to in high school, making it difficult for him to find his learning direction.

//   `},
//   {role: "user", content: `What is Execution?`},
//   {role: "assistant", content: `Individuals with high values in this Motivation DNA usually analyze tasks pragmatically, considering whether the tasks are reasonable and whether the projects can be executed smoothly, thereby obtaining relevant information and knowledge to ensure project success. This trait falls under the "Practitioner" category on the Motivation Map.
//   The higher the MQ value, such as above 70, the more one emphasizes the practicality, applicability, and universality of learning, research, and design, executing tasks with a results-oriented approach. Conversely, the lower the MQ value, such as below 30, the more one prefers abstract thinking, and an overemphasis on practical learning may quickly lead to a loss of interest. It is recommended to try hands-on execution to implement ideas practically.

//   A representative of high Execution is Bill Gates, co-founder of Microsoft. He wrote his first computer program at the age of 13. His lifelong achievements in the computer software industry can be attributed to his fascination with "machines" and his passion for perfectly executing software code.

//   An example application of high Execution is as follows: Claire, a business school student, enjoys the practical assignments given by her teachers the most because she can apply what she has learned in real-world scenarios. For a market survey assignment, she meticulously designed the questionnaire, tirelessly interviewed different subjects, and used her analytical skills to identify user preference trends from the complex survey data. She was fully invested in this task and thoroughly enjoyed it.

//   `},
//   {role: "user", content: `What is Team Coordination?`},
//   {role: "assistant", content: `This Motivation DNA focuses on task-oriented division of labor, human resource allocation, and resource sharing. Individuals with this Motivation DNA typically find solutions from the breadth and depth of research topics and problems. They excel at coordinating the synergy brought by collective efforts, such as brainstorming and team interactions. This trait falls under the "Practitioner" category on the Motivation Map.
//   The higher the MQ value, such as above 70, the more one enjoys collaborating with others, sharing resources, and dividing tasks. Conversely, the lower the MQ value, such as below 30, the less one likes collaborating and sharing resources with others. However, team interaction is crucial in modern society, and it is recommended to learn to appropriately share information and allocate resources with others to achieve goals more effectively.

//   A representative of high Team Coordination is Fei-Fei Li, an American computer scientist and professor at Stanford University. She co-founded AI4ALL, a non-profit organization with the mission of promoting diversity and inclusion through human-centered AI principles, fostering the next generation of AI technology experts, thinkers, and leaders, thereby building a better team.

//   An example application of high Team Coordination is as follows: Jacob is a student who understands how to utilize group resources and excels in team interactions. In group tasks, he often takes the initiative to coordinate, inspiring the different potentials of each team member, and integrates and allocates existing human resources and resources to accomplish the assigned tasks.

//   `},
//   {role: "user", content: `What is Collector?`},
//   {role: "assistant", content: `This Motivation DNA values synergy, often involving the collection and integration of various data or talents and effectively utilizing resources. Individuals with high values in this Motivation DNA tend to discover the potential value in new information in their work or studies. Therefore, they usually explore countless possibilities with an open mind, without bias towards nominal practicality. This trait falls under the "Administrator" category on the Motivation Map.
//   The higher the MQ value, such as above 70, the better one is at collecting various data, talents, and resources, integrating and managing them to produce maximum results. Conversely, the lower the MQ value, such as below 30, the less likely one is to pay attention to collecting and organizing data or resources. It is recommended to start by identifying areas of interest related to time (time-saving/time management) and money (budget management/financial planning) to cultivate these skills.

//   A representative of high Collector is Thomas Edison, the inventor of the phonograph and holder of numerous patents. To improve the lifespan of the incandescent light bulb, he tested over a thousand different materials for the filament.

//   An example application of high Collector is as follows: Amy is the finance head of her club. She excels at collecting, integrating, and managing various useful information related to the club and can help raise funds and collect activity fees from external sources. She has a far superior understanding of finance and management compared to other club members and always discovers potential resources.

//   `},
//   {role: "user", content: `What is Beauty?`},
//   {role: "assistant", content: `This Motivation DNA encourages innovation, eschewing traditional or modern trends, and using different aesthetic perspectives and methods to convey unique designs and creativity. Individuals with high values in this Motivation DNA see their uniqueness as their "brand," driving them to continually strive for perfection. This trait falls under the "Visioner" category on the Motivation Map.
//   The higher the MQ value, such as above 70, the more one has a keen eye for finding beauty in seemingly ordinary elements within their work. Conversely, the lower the MQ value, such as below 30, the less one is inclined to pursue art and beauty. However, in a globalized world, many disciplines and professions still relate to aesthetics. It is recommended to take time to notice beautiful things, find one's unique aesthetic perspective, and diversify learning concepts.

//   A representative of high Beauty is Leonardo da Vinci, the creator of the famous portrait Mona Lisa. His unique perception of beauty and masterful execution made the Mona Lisa one of the most famous, widely discussed, and highly recognized works of art in the world.

//   An example application of high Beauty is as follows: Pamela effortlessly exudes a sense of beauty. Her creations always appear simple yet elegant. Her handwriting is neat and distinct, and her outfits are always well-coordinated and appropriate. She doesn't need brand names to enhance her image because she naturally radiates an aura of artistic beauty, making her a brand in her own right. Her innovation is spontaneous and natural, often transforming into a form of art without any conscious effort.

//   `},
//   {role: "user", content: `What is Creativity?`},
//   {role: "assistant", content: `The "beauty" in this Motivation DNA includes both tangible and intangible beauty, which can be perceived through the visual appearance of objects, auditory perception, tactile sensations, and further lead to new innovative ideas. This trait falls under the "Visioner" category on the Motivation Map. The higher the MQ value, such as above 70, the more one dares to innovate, think outside the box, and is not constrained by traditional or modern trends, daring to convey a unique artistic design and aesthetic through different forms and methods. The lower the MQ value, such as below 30, the harder it is to come up with new ideas or innovations out of thin air. We recommend not setting limits on oneself in learning and creation, occasionally accepting small mistakes and boldly innovating. Listening more, observing more, thinking more, and discussing more can enhance one's creativity.
//   An example of a high Creativity is the famous architect and designer Leoh Ming Pei's cleverly designed Louvre Pyramid. Initially not accepted by the public and even challenged, it eventually succeeded and stands as the best proof of innovative design in the field of art.

//   An application example of high Creativity is Justin, a natural artist. His designs naturally exude a unique and refreshing beauty that amazes people. More importantly, the artistic essence he possesses often transforms into elements of beauty incorporated into his designs. When listening to music, he might get inspired to make the music sound more pleasant, thereby creating even better music. His motivation for creation stems from his sensitivity to and appreciation of beauty.

//   `},
//   {role: "user", content: `What is Sensibility?`},
//   {role: "assistant", content: `The Motivation DNA for a keen insight into the beauty of people and things in life. People with high values in this Motivation DNA can apply this insight to presentations, artistic works, design plans, or other abstract/concrete forms, making others appreciate and enjoy their creations. This trait falls under the "Visioner" category on the Motivation Map. The higher the MQ value, such as above 70, the more one emphasizes personal unique taste in creation and design, aligning with their identity and social status to achieve perfection. The lower the MQ value, such as below 30, the less one cares about others' thoughts and feelings. We recommend paying more attention to feedback and opinions from others in team interactions, diversifying learning or thinking, and enjoying the fun of learning and growing together.
//   A representative figure with high keen insight is Steve Jobs, the founder of Apple, who created a series of artistically rich yet practical products, loved and pursued by loyal customers worldwide.

//   An application example of high Sensibility is Nancy, a very popular teacher among students because she can easily sense and observe students' reactions and care for them in a natural and delicate manner. However, sometimes she also worries too much about various things due to her sensitivity.

//   `},
//   {role: "user", content: `What is Prestige?`},
//   {role: "assistant", content: `The Motivation DNA for pursuing excellence and even perfection emphasizes elegantly expressing personal unique taste. For those with high values in this Motivation DNA, uniqueness is their "brand" and the driving force behind their relentless pursuit of perfection. This trait falls under the "Visioner" category on the Motivation Map. The higher the MQ value, such as above 70, the more keenly they perceive and appreciate the subtleties of people and things in life, leading to the creation of works that evoke human needs and touch the heart. The lower the MQ value, such as below 30, the more likely they are to overly focus on inner substance while neglecting external presentation and expression, often resulting in perceived lower quality of their work.
//   A representative figure with high Prestige is Gabrielle "Coco" Chanel, the founder of the luxury fashion brand Chanel, where every product reflects her pursuit of aesthetic perfection.

//   An application example of high Prestige is Johnson, who loved wearing brand-name clothes since high school, which was difficult for his parents to afford. After taking the MQ test, he discovered his strong passion for perfect taste. With guidance, he channeled this passion into the field of finance, aspiring to work on Wall Street, which he considered the "brand name" of his field. During university, he diligently worked and interned with the goal of entering Wall Street. Eventually, he achieved his dream, satisfying his passion for perfect taste.

//   `},
//   {role: "user", content: `What is Creative Curiosity?`},
//   {role: "assistant", content: `The Motivation DNA for actively exploring and researching the essence of beauty in life, and creating refreshing products with a new perspective. This trait falls under the "Visioner" category on the Motivation Map. The higher the MQ value, such as above 70, the stronger the spirit of exploration and research into the essence of things, often creating refreshing works with an attitude of pursuing artistic beauty. The lower the MQ value, such as below 30, the less interest there is in exploring and researching the essence of artistic beauty in life. We recommend trying to visit art galleries or craft museums to enhance creativity and taste.
//   A representative figure with high Creative Curiosity is Pablo Picasso, known for his diverse artistic styles. Driven by intense curiosity, he continually explored various forms of artistic expression throughout his life.

//   An application example of high Creative Curiosity is Jay, who has a unique perception and feeling for art. He observes the essence of various aspects of life from different and unique perspectives, creating designs that are distinct from others to express his inner thoughts. Like Jay Chou, he creates songs with his own unique style.

//   `},
//   {role: "user", content: `What is Justness?`},
//   {role: "assistant", content: `The Motivation DNA for emphasizing numerical accuracy, completeness of rules, and logical rigor. People with this Motivation DNA make predictions based on existing facts or principles and firmly stick to what they believe is correct. This trait falls under the "Practitioner" category on the Motivation Map. The higher the MQ value, such as above 70, the more they insist on numerical accuracy, completeness of rules, and logical rigor. The lower the MQ value, such as below 30, the less they enjoy tasks or studies requiring precision, such as rigorous mathematical proofs. We recommend that when faced with studies that have strict requirements, even if the standards are not met, to encourage oneself and not give up easily.
//   A representative figure with high Justness is Grace Hopper, the inventor of modern computer programming languages. Despite multiple rejections of her proposal to use plain English instead of pure code to improve performance, she persisted and successfully proved its feasibility, thereby revolutionizing computer programming languages.

//   An application example of high Justness is Zach, who has had a strong affinity for numbers and a love for video games since childhood, as games have scores to determine winners and losers. In high school, he was introduced to video game design during a summer camp and discovered that he could use computer programming to design games he liked. He then began self-learning game programming and plans to pursue this field in university.

//   `},
//   {role: "user", content: `What is Analytical Curiosity?`},
//   {role: "assistant", content: `This Motivation DNA fosters a strong interest in mathematics, algorithms, and the logic behind complex problems. People with high values in this Motivation DNA typically start with basic analysis and then solve problems through complex processes. This trait falls under the "Innovator" category on the Motivation Map. The higher the MQ value, such as above 70, the more they enjoy independent thinking and solving unique problems using their own methods. The lower the MQ value, such as below 30, the less they enjoy overly complex logical deductions. We recommend not rushing to solve complex problems but starting with the simplest tasks, gradually training the ability to analyze and scrutinize problems logically.
//   A representative figure with high Analytical Curiosity is Katherine Johnson, an American mathematician and senior NASA employee whose orbital mechanics calculations were crucial to the success of American manned space flights. She worked at NASA for 33 years, becoming famous for her expertise in complex manual calculations and pioneering the use of computers to perform missions.

//   An application example of high Analytical Curiosity is Richard, who was a golf expert in high school. He believed that golf is a sport that requires repeated calculations and mental effort. In college, he studied mathematics, a subject that also required logical analysis. He enjoyed the process of studying mathematics just as much as sinking a putt on the golf course. After graduation, he joined the Google AI Research Institute, where he began relevant research and felt completely at home.

//   `},
//   {role: "user", content: `What is Intellectual Independence?`},
//   {role: "assistant", content: `This Motivation DNA leads individuals to enjoy independent thinking and having unique ideas, relying on their own opinions when solving problems. They desire to prove their distinctiveness and pursue their individuality. This trait falls under the "Innovator" category on the Motivation Map. The higher the MQ value, such as above 70, the greater the interest in numerical theories, computational rules, and the principles behind complex problems. The lower the MQ value, such as below 30, the more they prefer discussing and incorporating others' ideas when solving problems. We recommend trying to solve some problems independently, rather than waiting for others to tell you what to do, gradually increasing your ability to solve problems independently.
//   A representative figure with high Intellectual Independence is John Nash, who was awarded the Nobel Prize in Economics in 1994 for his outstanding contributions to game theory. Despite facing many challenges throughout his life, he chose to actively confront them and follow his own path.

//   An application example of high Intellectual Independence is Helen, who always sought to express her unique thoughts in a different way during her studies. For instance, in art class, she would take the risk of deviating from the teacher's assigned topic to create her own style. In her later studies, she often took the risk of focusing on niche areas, developing many unique and distinctive research topics.

//   `},
//   {role: "user", content: `What is Contemplation?`},
//   {role: "assistant", content: `This Motivation DNA derives inspiration from solitude, quiet contemplation, and answering questions. Individuals with high values in this Motivation DNA often "live in their own world," even striving to create an environment conducive to focused learning or work. This trait falls under the "Integrator" category on the Motivation Map. The higher the MQ value, such as above 70, the more they enjoy immersing themselves in a world of thought and problem-solving, drawing inspiration and motivation from solitude. The lower the MQ value, such as below 30, the less they enjoy static learning or working methods. We recommend combining dynamic activities (such as sports, outings, etc.) with study or work, then returning to a quiet space to focus on learning.
//   A representative figure with high Contemplation is Florence Nightingale, the inventor of the polar area diagram widely used in statistics, who greatly enjoyed quiet moments and found inspiration in them.

//   An application example of high Contemplation is Maverick. He discovered that he needs to spend some time calming down before he can truly get into the learning state. During university, he would intentionally find a period of time for quiet solitude before the start of each semester to think clearly about what he wanted to accomplish and the subjects he needed to study, ensuring he had adequate time to think once the semester began.

//   `},
//   {role: "user", content: `What is Physical Activity?`},
//   {role: "assistant", content: `This Motivation DNA indicates an active engagement in physical exercise, driven purely by the enjoyment of breaking a sweat and the satisfaction and achievement that come from engaging in physical activity, regardless of personal fitness level or competition outcomes.
//   - **High MQ Value (above 70)**: Individuals with a high MQ value are more willing to spend time and money on exercise. Physical activity (of any type) occupies a significant portion of their daily life. They can purely enjoy the state of sweating and the satisfaction and achievement from exercise.
//   - **Low MQ Value (below 30)**: Individuals with a low MQ value are less likely to have a regular exercise routine and do not derive happiness or satisfaction from physical activity.

//   We recommend for those with a low MQ value to try integrating small, enjoyable physical activities into their daily routine to gradually build a habit and potentially discover a form of exercise they enjoy.

//   `},
//   {role: "user", content: `What is Food & Eating?`},
//   {role: "assistant", content: `This Motivation DNA indicates a strong enjoyment of food and eating-related activities.
//   - **High MQ Value (above 70)**: Individuals with a high MQ value place great importance on eating. For them, it’s not just about physical satisfaction but also about rewarding themselves, relieving stress, and finding joy in the experience, much like an artist appreciating their masterpiece.
//   - **Low MQ Value (below 30)**: Individuals with a low MQ value do not place much importance on eating and are less likely to spend time thinking about their meals.

//   We recommend for those with a low MQ value to try exploring different cuisines or cooking as a way to find more enjoyment in food, which could lead to a greater appreciation of meals and potentially improve their overall well-being.

//   `},
//   {role: "user", content: `What is Recognition?`},
//   {role: "assistant", content: `This Motivation DNA indicates a desire for external recognition and acceptance, also known as the sensitivity index.
//   - **High MQ Value (above 70)**: Individuals with a high MQ value strongly desire and need recognition and acceptance from others. The advantage is their keen sensitivity to others' expectations and market trends. However, being overly concerned with others' evaluations can lead to high stress, fear of conflict, tendency to give up when faced with setbacks, difficulty accepting suggestions or criticism, and an inclination to overemphasize negative outcomes.
//   - **Low MQ Value (below 30)**: Individuals with a low MQ value have a lower psychological need for recognition and acceptance from others. Such people are usually more confident, able to do what they want and believe is right, capable of standing firm against opposition, and forging ahead with determination.

//   We recommend that individuals with a high MQ value work on building self-confidence and resilience, focusing on their own goals and values to reduce the impact of external opinions. Those with a low MQ value might benefit from being open to feedback and considering others' perspectives to balance their independence with collaborative growth.

//   `},
//   {role: "user", content: `What is the desire for Serenity?`},
//   {role: "assistant", content: `This Motivation DNA indicates how individuals deal with anxiety, stress, and fear, also known as the stress tolerance index.
//   - **High MQ Value (above 70)**: Individuals with a high MQ value have a strong desire for stability and peace, with a low tolerance for change. They seek environments that do not cause stress or psychological threats and tend to be cautious in their actions.
//   - **Low MQ Value (below 30)**: Individuals with a low MQ value have a low psychological need for stability and peace. They are brave in stepping out of their comfort zones, frequently taking risks, and embracing challenges. However, they may find jobs lacking in challenges to be boring.

//   We recommend that individuals with a high MQ value work on developing coping mechanisms for stress and gradually exposing themselves to controlled changes to build resilience. Those with a low MQ value might benefit from incorporating some stability into their routines to ensure a balanced approach to their adventurous and risk-taking tendencies.

//   `},
//   {role: "user", content: `What is Competitiveness?`},
//   {role: "assistant", content: `This Motivation DNA reflects the psychological need to compete, strive for victory, and avoid failure, also known as the "competition index."
//   - **High MQ Value (above 70)**: Individuals with a high MQ value place great importance on winning and do not like to lose. They are unafraid of competition, enjoy the feeling of winning and losing in contests, and appreciate aggressive confrontations. However, they may often be in a combative state of mind and find it difficult to forgive others.
//   - **Low MQ Value (below 30)**: Individuals with a low MQ value prefer to stay low-key and avoid conflict. They avoid competing in public and, if they must compete, they strive to maintain harmony and avoid hurting relationships. Even when victorious, they prefer friendly matches and aim for win-win situations.

//   We recommend that individuals with a high MQ value work on managing their competitive drive to maintain healthy relationships and balance their need for victory with cooperation and empathy. Those with a low MQ value might benefit from engaging in competitive activities occasionally to build resilience and confidence in handling conflicts and competitive situations.

//   `},
//   {role: "user", content: `What is Family Relationships?`},
//   {role: "assistant", content: `This Motivation DNA reflects the individual's relationship with family, including their willingness to nurture the next generation, the importance they place on family needs, and their desire to maintain relationships among family members.
//   - **High MQ Value (above 70)**: Individuals with a high MQ value are more willing to spend time on family matters, place great importance on relationships among family members, and have a strong desire to nurture the next generation.
//   - **Low MQ Value (below 30)**: Individuals with a low MQ value prefer independence and autonomy, aiming to free themselves from family burdens and enjoy a more free-spirited lifestyle.

//   We recommend that individuals with a high MQ value balance their dedication to family with personal time and self-care to avoid burnout. Those with a low MQ value might benefit from finding ways to stay connected with family while maintaining their independence, ensuring a supportive yet autonomous lifestyle.

//   `},
//   {role: "user", content: `What constitutes excessive passion?`},
//   {role: "assistant", content: `In the MQ database, the average person has about 6 out of 24 DNAs (excluding Life Indexes) with an MQ value above 70. If an individual has more than 10 DNAs with an average MQ value over 70, and the other values are also relatively high, this is referred to as having excessive passion. This often results in a lack of focus and difficulty in persisting with one task.
//   We recommend that individuals with excessive passion work on prioritizing their interests and setting clear goals to channel their energy more effectively, ensuring they can maintain focus and achieve sustained success in their endeavors.

//   `},
//   {role: "user", content: `What constitutes insufficient passion?`},
//   {role: "assistant", content: `In MQ's large database, it is found that the average person has about six DNAs (excluding life indicators) with an MQ value above 70. If a person has less than two with overall low values, it is considered insufficient passion, often leading to a lack of proactivity. The reasons for insufficiency may be influenced by the surrounding environment, work, family pressure, or peer pressure.
//   `},
//   {role: "user", content: `What is the relationship between the Motivation Quotient and passion?`},
//   {role: "assistant", content: `The relationship between MQ values and passion is as follows:
//   - **High MQ**: Indicate a strong level of enthusiasm and passion in the corresponding Motivation DNA. Individuals with high MQ values (above 70) in several areas are likely to be highly driven and motivated in those aspects of their lives. They pursue their interests and goals with great energy and dedication.

//   - **Excessive Passion**: If an individual has an unusually high number of DNAs with MQ values exceeding 70 (more than 10 out of 24, excluding lifestyle indicators), it suggests excessive enthusiasm. This can lead to difficulties in focusing and sustaining effort on a single task due to being overly passionate about many different areas.

//   - **Balanced MQ**: Having a mix of high and moderate MQ values across different DNAs typically indicates a well-rounded enthusiasm. This balance helps individuals to focus and persist in their endeavors without spreading themselves too thin.

//   - **Low MQ**: Indicate lower enthusiasm and interest in those areas. Individuals with many low MQ values (below 30) may not be as driven or motivated in those aspects, preferring to avoid or spend less time on such activities.

//   **Recommendations**:
//   - **For Those with High MQ Values**: Focus on prioritizing and setting clear goals in the areas where enthusiasm is highest to ensure sustained effort and achievement.
//   - **For Those with Excessive Passion**: Practice managing and channeling energy effectively by creating structured plans and focusing on fewer interests at a time.
//   - **For Those with Balanced MQ**: Continue to maintain a balance, leveraging strengths in various areas while ensuring sustained focus.
//   - **For Those with Low MQ**: Explore ways to increase motivation in lower-interest areas if they are essential, or delegate such tasks to others when possible.

//   By understanding the relationship between the Motivation Quotient (MQ) and passion, individuals can better manage their passions and direct their energy towards achieving their goals more effectively.

//   `},
//   {role: "user", content: `How to use MQ to judge future development?`},
//   {role: "assistant", content: `MQ (Motivation Quotient) quantifies intrinsic motivations, driving individuals' behaviors and influencing learning, work, life, and relationships. People's actions are determined by their internal motivations (i.e., their MQ), but they are also affected by their environment. Essentially, people are inclined to do what they like and avoid what they dislike.
//   For example, if someone likes a job, beyond salary and benefits, they might consider whether the job allows them to conduct independent research while being part of a structured organization. These preferences can be determined from their Motivation DNA and the associated rules.

//   The same applies to learning. By understanding their intrinsic motivations, individuals can identify subjects and fields they are likely to enjoy and pursue in the future.

//   Key points to consider:
//   1. **Intrinsic Motivation (MQ)**: Drives behavior by aligning with personal preferences and interests.
//   2. **Environment**: External factors can influence but do not solely determine actions.
//   3. **Career Choices**: Considerations include whether the job satisfies personal motivations, such as independent research or being part of a structured organization.
//   4. **Learning**: Identifying subjects and fields that align with intrinsic motivations can guide educational and professional paths.

//   By understanding and leveraging MQ, individuals can make more informed decisions that align with their intrinsic motivations, leading to greater satisfaction and success in various aspects of life.

//   `},
//   {role: "user", content: `How to find your true intrinsic motivation?`},
//   {role: "assistant", content: `People often ask how to discover their true intrinsic motivations. The results of MQ assessments can vary with age, experience, environment, and even one's current mood. The best approach is to take the MQ assessment multiple times. MQ has a tracking system that can analyze data over time, identifying changes and revealing one's true likes and dislikes.
//   Key Points:
//   1. **Variability**: MQ results can change due to various factors such as age, experience, environment, and current mood.
//   2. **Repetition**: Taking the MQ assessment multiple times helps to identify consistent patterns in motivations.
//   3. **Tracking System**: MQ's tracking system analyzes data over time, helping to identify true intrinsic motivations by highlighting persistent likes and dislikes.
//   4. **Self-awareness**: Regular assessment and analysis can improve self-awareness and guide better decision-making in personal and professional life.

//   By repeatedly assessing and tracking MQ, individuals can gain a deeper understanding of their intrinsic motivations and make more informed choices that align with their true preferences.

//   `},
//   {role: "user", content: `If our MQ values differ greatly, does that mean we cannot get along?`},
//   {role: "assistant", content: `Although MQ has principles of affinity and distance, meaning that when two people have a particular DNA value above 70, they often find it easy to discuss and agree on that dimension. Conversely, if the difference in their DNA values exceeds 40, they are likely to have opposing views, leading to friction or misunderstandings. However, differing opinions can also present a good opportunity for complementarity. With mutual understanding, individuals can complement each other's weaknesses, challenge each other, and improve quality.
//   Key Points:
//   1. **Affinity Principle**: When two individuals have high MQ values (above 70) in the same DNA dimension, they tend to have similar opinions and find it easy to communicate and agree on that topic.
//   2. **Distance Principle**: When there is a significant difference in MQ values (more than 40 points) in a specific DNA dimension, it often leads to opposing views and potential friction or misunderstandings.
//   3. **Complementarity**: Opposing opinions can be beneficial if both parties are willing to understand each other. This can lead to mutual complementarity, where each person compensates for the other's weaknesses, and the exchange of ideas can enhance the overall quality of their work or relationship.

//   By recognizing and managing these dynamics, individuals and teams can leverage their intrinsic motivations to foster better understanding, collaboration, and personal growth.

//   `},
//   {role: "user", content: `Do some of my passions still have potential for further development?`},
//   {role: "assistant", content: `Typically, MQ values range between 30 and 70. We believe that with changes in the environment or appropriate understanding and training, there is room for improvement within this range. For passions with values below 30, improvement tends to be more challenging, but it is not impossible.
//   `},
//   {role: "user", content: `What is the difference between Inquisitive Curiosity, Analytical Curiosity, and Creative Curiosity?`},
//   {role: "assistant", content: `These three Motivation DNAs are all related to curiosity, but they focus on different aspects:
//   1. **Inquisitive Curiosity**: This DNA centers on a pure enjoyment of encountering new things, such as new knowledge and technologies. Individuals with high inquisitive curiosity are driven by the desire to learn and discover.

//   2. **Analytical Curiosity**: This DNA reflects a strong interest in mathematics, algorithms, and the logic behind complex problems. People with high logical analysis DNA are fascinated by the underlying principles and patterns in numerical and logical systems.

//   3. **Creative Curiosity**: This DNA is inclined towards exploring and researching the essence of beauty in life. Individuals with high exploration and research DNA seek to interpret or create refreshing works with a new perspective, driven by a desire to uncover and present the fundamental nature of beauty.

//   In summary:

//   - **Inquisitive Curiosity**: Focuses on enjoying and engaging with new knowledge and technologies.
//   - **Analytical Curiosity**: Concentrates on understanding the logic behind mathematics, algorithms, and complex problems.
//   - **Creative Curiosity**: Emphasizes exploring the essence of beauty in life and creating new interpretations or works.

//   Understanding these distinctions helps individuals leverage their natural curiosities to pursue fulfilling activities and careers that align with their interests.

//   `},
//   {role: "user", content: `What is the difference between Ingenuity, Expedience, and Creativity?`},
//   {role: "assistant", content: `These three DNAs are all related to creativity, each with an aspect of thinking outside the box, but they focus on different facets:
//   1. **Ingenuity**: Emphasizes thinking styles. Individuals with high flexibility and adaptability DNA are able to think in unconventional ways, easily shifting perspectives to solve problems creatively.

//   2. **Expedience**: Focuses on achieving work or learning goals with high efficiency. Those with high efficiency and speed DNA prioritize completing tasks quickly and effectively, often finding innovative ways to streamline processes.

//   3. **Creativity**: Centers on expressing abstract ideas or concepts of beauty through design. Individuals with high innovative design DNA aim to translate their creative visions into tangible, aesthetically pleasing designs.

//   In summary:

//   - **Ingenuity**: Emphasizes creative thinking and the ability to shift perspectives.
//   - **Expedience**: Focuses on achieving goals quickly and effectively, often through innovative methods.
//   - **Creativity**: Involves expressing abstract concepts of beauty through creative design.

//   By understanding these distinctions, individuals can better harness their creative strengths in various contexts, whether it be through innovative thinking, efficient problem-solving, or artistic expression.

//   `},
//   {role: "user", content: `What is the difference between Intellectual Independence and Pioneering Independence?`},
//   {role: "assistant", content: `People with high Pioneering Independence are full of independence, autonomy, and exploration spirit, focusing on independent action and pioneering, hoping to make decisions or complete tasks independently without seeking advice or help. People with high Intellectual Independence like independent thinking, having unique ideas, and solving problems without relying on others' opinions, craving to prove their uniqueness and pursuing self-uniqueness.
//   `},
//   {role: "user", content: `Does a high value in Influence mean liking to be a leader?`},
//   {role: "assistant", content: `People with high Influence often enjoy influencing others with their own ideas and typically become leaders within a group. However, in the digital age, the ability to influence others is not limited to being a team leader. One can also achieve this through writing, videos, and other forms of media while working independently behind the scenes. Additionally, these individuals also enjoy tirelessly teaching others the new knowledge or skills they have acquired.
//   Key Points:
//   1. **Leadership and Influence**: High Influence individuals naturally take on leadership roles and influence others through their thinking.
//   2. **Digital Influence**: In the modern era, influence can be exerted through various media, allowing these individuals to impact others without traditional leadership roles.
//   3. **Teaching and Sharing**: They have a strong inclination to share their knowledge and skills with others, often enjoying the process of teaching.

//   By leveraging both traditional leadership and modern digital tools, individuals with high power dominance can effectively expand their influence and share their expertise widely.

//   `},
//   {role: "user", content: `What are the similarities and differences between Practicality and Execution?`},
//   {role: "assistant", content: `These two DNAs both pertain to practical application and execution, enabling individuals to pragmatically achieve their goals or deliver tasks.
//   - **Practicality**: Focuses on whether goals can be realistically achieved, with behavior driven by practical considerations.
//   - **Execution**: Emphasizes the precise execution of a specific task or mission, with behavior determined by whether the task can be executed.

//   By understanding these distinctions, individuals can better align their actions with either goal-oriented practicality or task-focused execution.

//   `},
//   {role: "user", content: `What is the difference between Methodical Order and Administrative Order?`},
//   {role: "assistant", content: `These two DNAs are related to how learning or work plans are arranged.
//   - **Methodical Order**: Focuses on overall plan formulation, emphasizing comprehensive and long-term considerations. Individuals with high Methodical Order DNA create learning or work plans that are thorough and strategic, often suited for leadership roles where guiding a team towards collective progress is essential.

//   - **Administrative Order**: Emphasizes precise and detailed execution of plans. Individuals with high Administrative Order DNA create plans that are meticulous and exact, excelling in roles that require steady, detailed-oriented work and ensuring tasks are executed flawlessly.

//   In summary:

//   - **Methodical Order**: More suited for leadership roles, focusing on comprehensive and long-term planning.
//   - **Administrative Order**: More suited for roles that require meticulous attention to detail and steady execution of tasks.

//   By understanding these distinctions, individuals can align their strengths with the appropriate roles and tasks, maximizing their effectiveness and satisfaction in both learning and work environments.

//   `},
//   {role: "user", content: `What is the difference between Teamworking and Team Coordination?`},
//   {role: "assistant", content: `Teamworking and Team Coordination are both DNAs related to group dynamics.
//   - **Teamworking**: Emphasizes interpersonal interactions within the team. This DNA focuses on communication and efficiency among team members, ensuring that relationships and exchanges within the team are strong and productive.

//   - **Team Coordination**: Focuses on the distribution of tasks and sharing of resources within the group. This DNA is concerned with how tasks are assigned and how resources are managed to accomplish the team's goals, placing more importance on the efficient allocation of responsibilities and materials.

//   In summary:

//   - **Teamworking**: Prioritizes the people within the team and their interactions.
//   - **Team Coordination**: Prioritizes the tasks and resources required for the team to function effectively.

//   By understanding these distinctions, teams can optimize both interpersonal dynamics and resource management, leading to more cohesive and efficient teamwork.

//   `},
//   {role: "user", content: `What is the relationship between Beauty and Prestige?`},
//   {role: "assistant", content: `Both of these concepts are related to the idea of "beauty" and can be seen as expressions of it:
//   - **Beauty**: This refers to an individual's appreciation of the aesthetic qualities of objective things. It involves applying one's sense of beauty to various tasks or learning experiences. People with high artistic aesthetic values often perceive and express beauty in everything they do, giving an impression of elegance and grace in their actions.

//   - **Prestige**: This stems from an individual's subjective demands for the aesthetic elements of objective things, using personal taste as a brand. This concept is not limited to art and can be applied to work or study. People with high perfect taste are often seen as having high standards and being meticulous in their expectations of people, things, and tasks, which can sometimes make them seem distant or elevated.

//   In summary:

//   - **Beauty**: Focuses on an individual's appreciation and expression of beauty, often perceived as graceful and elegant.
//   - **Prestige**: Focuses on high standards and meticulousness in various areas, often perceived as having high expectations and a refined sense of style.

//   By understanding these distinctions, individuals can better appreciate and harness their aesthetic strengths in both personal and professional contexts.

//   `},
//   {role: "user", content: `What is the difference between Contemplation and Pioneering Independence?`},
//   {role: "assistant", content: `People with high Pioneering Independence are characterized by their strong independence, self-reliance, and exploratory spirit. They focus on acting alone and pioneering new paths, preferring to make decisions and complete tasks without seeking advice or help from others.
//   On the other hand, those with high values in Contemplation enjoy calm and quiet environments. They draw inspiration and engage in quiet thinking during solitude and do not mind collaborating with others.

//   In summary:

//   - **High Pioneering Independence**:
//     - Strong independence and self-reliance
//     - Focus on acting alone and pioneering
//     - Prefer making decisions and completing tasks without external help

//   - **High Contemplation**:
//     - Enjoy calm and quiet environments
//     - Draw inspiration and engage in quiet thinking during solitude
//     - Open to collaborating with others despite their preference for solitude

//   Understanding these distinctions helps in aligning tasks and environments with individuals' strengths, fostering productivity and personal satisfaction.

//   `},
//   {role: "user", content: `Are Justness and Ingenuity opposite DNAs?`},
//   {role: "assistant", content: `Most people with high Justness tend to have lower Ingenuity, and vice versa. This is because individuals who prioritize Justness base their ideas on facts or principles. In contrast, those who are high in Ingenuity can think outside the box and come up with various untested ideas without being limited by established frameworks.
//   In summary:

//   - **High Justness**:
//     - Ideas based on facts and principles
//     - Less flexible and adaptable
//     - Prefer structured and validated approaches

//   - **High Ingenuity**:
//     - Capable of thinking outside the box
//     - Open to untested and innovative ideas
//     - Less constrained by established frameworks

//   Understanding these traits can help in assigning roles and tasks that align with individuals' natural strengths, promoting efficiency and creativity within teams.

//   `},
//   {role: "user", content: `Is Sensibility only about having keen insight into "beauty" in life?`},
//   {role: "assistant", content: `Not only do they have an insight into "beauty," but people with this DNA are also typically sensitive to the people, events, and things in their daily lives. They possess deep and broad observational skills, and can clearly perceive their surroundings, whether they like or dislike the people, events, and things around them. This strong insight often reflects in their work, writings, or artistic creations.
//   `},
//   {role: "user", content: `Do people with high values in Collector have better financial management concepts?`},
//   {role: "assistant", content: `People with high values in collecting and saving are often strongly interested in data, talent, and resources around them. They typically place greater emphasis on understanding, managing, and distributing these assets. When applied to financial resource management, they are likely to have better financial concepts and skills than most people.
//   `},
//   {role: "user", content: `Does Altruism necessarily mean serving all of humanity?`},
//   {role: "assistant", content: `This DNA actually refers to an altruistic mindset. It might mean wanting to help a specific group of people, or it could also involve doing something remarkable that will be remembered for generations.
//   `},
//   {role: "user", content: `I haven't heard of MQ before. Is MQ something entirely new?`},
//   {role: "assistant", content: `You may not have heard of MQ because it was previously more focused on the academic field. MQ is a scenario-based assessment and big data platform based on "Motivation Science," which has been developed in the United States for 25 years, with a strong academic foundation. Nowadays, after identifying an individual's intrinsic motivations/passions using MQ, it can be applied in various aspects of learning, work, and life.
//   `},
//   {role: "user", content: `Family Relationships, Food & Eating, Physical Activity, Recognition, Serenity, and Competitiveness are closely related to everyday life and are referred to as Life Indexes. How are they different from general DNAs?`},
//   {role: "assistant", content: `General DNAs are more oriented towards application in learning or work, whereas lifestyle indicators are more applicable to aspects of daily life.
//   `},
//   {role: "user", content: `The 24 Motivation DNAs each have corresponding "Motivation Types." What are Motivation Types?`},
//   {role: "assistant", content: `Motivation types represent the learning, working, and development tendencies of a person. The 24 Motivation DNAs are divided into six types, forming a "motivation map." These six types are:
//   Motivation Types represent an individual's preferred ways of learning, working, and developing. The 24 Motivation DNAs are categorized into 6 Motivation Types, forming the "Motivation Map." These six types are:

//   1. **Producer**: Energetic, adventurous, competitive, and quick to take action with plans. They prefer not to spend too much time on detailed research and want the power to improve unreasonable situations. They use persuasion and organizational skills effectively, seek recognition for their performance, and expect others to work hard as well. Includes DNAs: Influence, Expedience, Methodical Order, and Practicality.

//   2. **Innovator**: Intuitive, expressive, and innovative. They prefer to express creativity and aesthetic sense through words, sounds, colors, or forms. They enjoy working independently but do not want to be ignored and perform best in an unrestrictive environment. Their goal in life is to create extraordinary things, and they dislike managing or being managed. They have casual friendships, are observant, analytical, and enjoy solving problems at their own pace. Includes DNAs: Inquisitive Curiosity, Exploration, Ingenuity, Pioneering Independence, Analytical Curiosity, and Intellectual Independence.

//   3. **Visioner**: Includes DNAs: Beauty, Creativity, Sensibility, Prestige, and Creative Curiosity.

//   4. **Integrator**: Kind, easy to get along with, and concerned about their own and others' feelings. They like to listen to and understand others, resolve conflicts, teach, and help others grow. They prefer teamwork and non-competitive environments, have broad social networks, and prioritize others over work. Includes DNAs: Teamworking, Altruism, and Contemplation.

//   5. **Practitioner**: Emotionally stable, patient, and straightforward. They prefer direct action and practical, hands-on environments where they follow established rules to create useful items. They are interested in technical activities and prioritize current tasks over future plans. They often prefer working alone. Includes DNAs: Systematic, Execution, Justness, and Team Coordination.

//   6. **Administrator**: Cautious, methodical, and precise. They prefer working in well-defined environments, follow procedures, and are seen as efficient, accurate, meticulous, reliable, and trustworthy. Their philosophy is steady progress, and they dislike change, innovation, risk-taking, or leadership roles. Includes DNAs: Administrative Order and Collector.

//   Understanding these Motivation Types helps to align personal strengths with suitable activities and roles, leading to more fulfilling and effective work and learning experiences.`},
//   {role: "user", content: "What is the stress index, and how can we determine if the stress is too high?"},
//   {role: "assistant", content: "When the MQ score for Serenity exceeds 70, we consider that the person is experiencing high levels of stress. If the score for Recognition also exceeds 70, we should pay special attention to their current psychological state to see if their environment is affecting them. Conversely, if the 'Serenity' MQ score is very low, it often indicates that the person might find their current life or work unchallenging and may seek to do things different from their current situation."},
//   {role: "user", content: "I have too many high motivation DNAs. What problems could this cause?"},
//   {role: "assistant", content: "When there are more than 12 high motivation DNAs (MQ scores exceeding 70), we consider that the person has too much passion, which may result in a lack of focus or being easily distracted. This person might lack the perseverance to see things through because they have too many interests. When faced with difficulties, they might not persist and instead switch to other activities."},
//   {role: "user", content: "I have too few high motivation DNAs. What should I do?"},
//   {role: "assistant", content: "When there are fewer than two high motivation DNAs (MQ scores exceeding 70), we consider that the person lacks passion and may not have the energy to do things. This is usually due to environmental pressures, leading them to choose to take it easy or go with the flow. We recommend addressing the sources of their stress first. Once the stress is relieved, their passion typically returns."},

// ];
// const strParser = new StringOutputParser();

// const handleStream = async (
//   stream: AsyncGenerator<StreamEvent, any, unknown>,
//   emitter: eventEmitter,
// ) => {
//   for await (const event of stream) {
//     if (
//       event.event === 'on_chain_stream' &&
//       event.name === 'FinalResponseGenerator'
//     ) {
//       emitter.emit(
//         'data',
//         JSON.stringify({ type: 'response', data: event.data.chunk }),
//       );
//     }
//     if (
//       event.event === 'on_chain_end' &&
//       event.name === 'FinalResponseGenerator'
//     ) {
//       emitter.emit('end');
//     }
//   }
// };

// const createMQAssistantChain = (llm: BaseChatModel) => {
//   const hbMessages = MQHandbook.map(entry => [entry.role, entry.content]);
//   const mqMessages = [
//     ['system', MQAssistantPrompt],
//     ...hbMessages,  
//     ['user', '{context}'],
//     new MessagesPlaceholder('chat_history'),
//     ['user', '{query}'],
//   ];

//   return RunnableSequence.from([
//     ChatPromptTemplate.fromMessages(mqMessages),
//     llm,
//     strParser,
//   ]).withConfig({
//     runName: 'FinalResponseGenerator',
//   });
// };

// const handleMQAssistant = (
//   query: string,
//   context: string,
//   history: BaseMessage[],
//   llm: BaseChatModel,
//   embeddings: Embeddings,
// ) => {
//   const emitter = new eventEmitter();

//   try {
//     const MQChain = createMQAssistantChain(llm);
//     const stream = MQChain.streamEvents(
//       {
//         chat_history: history,
//         query: query,
//         context: context,
//       },
//       {
//         version: 'v1',
//       },
//     );

//     handleStream(stream, emitter);
//   } catch (err) {
//     emitter.emit(
//       'error',
//       JSON.stringify({ data: 'An error has occurred please try again later' }),
//     );
//     logger.error(`Error in MQ assistant: ${err}`);
//   }

//   return emitter;
// };

// export default handleMQAssistant;
