Sportana
=================
**Stay active, be friendly. Sportana**


PROBLEM STATEMENT
-----------------
*@David 9/29*

As understood in psychology[1] and group dynamics[2], people have the natural tendency to socialize by connecting to one another through situations such as playing a game of soccer or basketball. People like to have fun and enjoy simple games with friends. Most of all, people like meeting new people. However, with today’s technology and services, procuring sports events and outings has become difficult and complex, and has since been delegated to companies, clubs, and managers of the like; It’s too much organization for one person to handle.

Problem solving through computation has shown us that there are better methods to solving this issue at hand. Through experience gained in the study of algorithms[3] and artificial intelligence[4], we have created a solution.

Our product enables people to recreate these activities without the need of a physical curator, but rather a digital one.  Introducing Sportana.

[1: Psych 100] [2: Group Dynamics - Wentworth] [3: CS-311] [4: CS-383]

PRODUCT DEFINITION
------------------
*@Brandon: 9/28 - 10/1*		

Sportana knows what sports you like, who you like playing with, and where you like to play.  Whether you just want some friendly competition or are looking for a formidable face-off, Sportana makes it easy to get out and get moving with people who love to play.

Sportana uses an intelligent queueing system to quickly find and group candidate players based on user-specified parameters such as location, preferred sport, and player skill.  When enough candidates have been discovered, an event is created where players may view and modify details such as where and when they want to play.  Players may also use the chat functionality to work out details and talk about their game. 

The queue is an extraordinary pipeline into the Sportana community.  To enhance this experience, every player may be rated for timeliness, friendliness, and competitiveness.  This helps create a better picture of who you are playing with, and also helps Sportana find relevant matches.  Sportana even remembers the event’s you’ve participated in and who you’ve played with, so you can easily set up another game any time you like.

In addition to the queue, users may choose to create their own events and invite their friends.  They can keep the event private or offload it to the Sportana discovery agent to find more players.  This gives users the power to tailor their games as they wish and conveniently makes their events a reality.

Sportana solves many problems introduced by conventional social-networking applications.  Instead of many users creating sparsely populated events that are destined for failure (and unsuspecting users’ feeds), events won’t be taken live until they are destined for success.  Gone are the days of filtering through a never ending feed of uninteresting posts and updates when trying to find people to play with:  Sportana makes it easy.  Start playing with the people you want, when you want.  Get ready to play, Sportana is here.


TEAM MEMBER ROLES
------------------
*@Eli 09/30*

**Jeff Boutotte**
**Role: Design, Database and Server Implementation**

I come from a family of software engineers - my mom is retired but used to work at Digital and my dad works at CA Technologies so I guess you could say my family revolves around software.  I’m in my senior year here at UMass as a Computer Science major with a concentration in Software Engineering (though also fulfilling requirements for Security & Privacy, Networking, and Software Systems).  My particular area of interest is currently in authentication but I would enjoy working anywhere in the areas I’m studying.  In terms of extracurriculars I enjoy being involved with the LRC at UMass as the Supplemental Instructor for CS 250 (Introduction to Computation) and playing pickup soccer with friends.

**Brandon Read**
**Role: Front-End, Design**

A successful product is the result of careful consideration, passionate enthusiasm, and obsessive attention to detail. A good idea is not enough. A good design is not enough. When people care about what they make--when they know it’s something that is absolutely essential to your daily life, they can make some remarkable products. That is what I want to do. I want my products to have meaning--I want them to be used because people love using them. I want to make things that are worth making.  In other news, I love french fries, design, and I’m an intersectional feminist.

**Alec Hirsch**
**Role: Front-End**

I was always interested in computers and how they worked. In high school I started writing games for the TI calculators and have loved programming ever since. Since then I have been doing freelance web developing with WordPress websites. I and am looking to expand my current knowledge of web systems, and am interested in pursuing a career in web development.

**Ryan Mullens**
**Role: Back-End**

I’ve always been very interested in languages and am currently attempting to learn german. In high school I never really had much luck with spanish and decided to try programming languages instead! And from that day in freshman year, I haven’t stopped programming. I have graded for cs187 and c220 and am currently a tutor for computer science classes at the LRC.

**David SooHoo**
**Role: Back-End + Front-End**

I’ve always been that one child in my family that wanted to do bigger things, hence the reason I like big data. Understanding the psychology and sociology of humans is really my passion, and big data is one way of examining them. I knew that I’d dive towards some kind of science degree because of my logical nature and so computer science has been the perfect fit since I entered college. Currently I work for IBM and do work with databases and web development.

**Eli Sandler**
**Role: Back-End**

I arrived at Umass as a undeclared major with no idea of what I wanted to do, so I took some intro level courses. One of those courses was Computer Science 121, which was my first taste of computer science. I've been hooked ever since. Once I graduate I want to go into the industry and hopefully find a job as network administrator.

**Nicholas McAvoy**
**Role: Front-End** 

I come from a very techie family. My mother is a computer programmer, my sister runs the computer science education program at the high school she teaches at, and my brother is studying computational physics. Only my father had no interest in computer science. I have been interested in math and science all my life but I only realized I was interested in programming early in my high school career. Even though my high school didn’t have very many computer science classes and there wasn’t much not connected with the school, by the end of high school I knew I wanted to do computer science for the rest of my life.


BUDGET + FUND REQUEST
------------------
*@Ryan 9/29*

| Name    | Description                                   | Cost                     |
|---------|-----------------------------------------------|--------------------------|
| Hosting | AWS EC2                                       | $337/month               |
| Domain  | Sportana.com                                  | $4,000 initial, $10/year |
| Salary  | 7 software engineers combined yearly salaries | $560,000/year            |
|         |                                               |                          |
| Total   | Initial Cost                                  | $4,000                   |
|         | Yearly Cost                                   | $564,054                 |


* Hosting Resources
  * Monthly cost for large-web-app server = $1122
    * 30% of large web app = $337/month
    * http://calculator.s3.amazonaws.com/index.html#key=calc-LargeWebApp-140323



TIMELINE FOR THE YEAR
------------------
*@Jeff 9/29*

| Date                      | Activity                                                                                              |
|---------------------------|-------------------------------------------------------------------------------------------------------|
| September 30 - October 5  | Original Proposal Document                                                                            |
| October 6 - October 12    | Functional Specifications Document                                                                    |
| October 13 - October 19   | ER database diagram, and RESTful API design.                                                          |
| October 20 - October 26   | Finalize design and begin implementation of database controller, server, and front-end.               |
| October 27 - November 9   | Continue implementation of system.                                                                    |
| November 10 - November 16 | Target completion of server implementation. Begin developing acceptance, unit, and integration tests. |
| November 17 - November 23 | Target front-end completion and test harness completion.                                              |
| November 24 - November 30 | Run tests and debug. Clean and finalize product.                                                      |
| December 1 - December 7   |                                                                                                       |
