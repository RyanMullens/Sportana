drop database if exists sportana;
Create database sportana;

\c sportana;
--
-- Name: users; Type: TABLE; Schema: public; Owner: student; Tablespace: 
--

CREATE TABLE users (
    uid integer NOT NULL,
    name text,
    email text,
    password text
);

CREATE TABLE team {
    name text,
    role text,
    bio text,
    image text
};


ALTER TABLE public.users, public.team OWNER TO student;

--
-- Name: users_uid_seq; Type: SEQUENCE; Schema: public; Owner: student
--

CREATE SEQUENCE users_uid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_uid_seq OWNER TO student;

--
-- Name: users_uid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: student
--

ALTER SEQUENCE users_uid_seq OWNED BY users.uid;


--
-- Name: uid; Type: DEFAULT; Schema: public; Owner: student
--

ALTER TABLE ONLY users ALTER COLUMN uid SET DEFAULT nextval('users_uid_seq'::regclass);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: student
--

INSERT INTO users VALUES (1, 'Ryan Mullens', 'ryan@mullens', 'password');
INSERT INTO users VALUES (2, 'John Smith', 'John@Smith.com', 'apple');
INSERT INTO users VALUES (3, 'Jane Doe', 'jane@doe.com', '12345');
INSERT INTO users VALUES (4, 'Test Test', 'test@test.com', 'test');
INSERT INTO users VALUES (5, 'Apple Sauce', 'Apple@sauce.com', '123321');
INSERT INTO users VALUES (16, 'Ryan Mullens', 'rmullens@umass.edu', '12345');


--
-- Data for Name: team; Type: TABLE DATA; Schema: public; Owner: student
--

INSERT INTO team VALUES ('Jeff Boutotte', 'Design, Database and Server Implementation', "I come from a family of software engineers - my mom is retired but used to work at Digital and my dad works at CA Technologies so I guess you could say my family revolves around software.  I'm in my senior year here at UMass as a Computer Science major with a concentration in Software Engineering (though also fulfilling requirements for Security & Privacy, Networking, and Software Systems).  My particular area of interest is currently in authentication but I would enjoy working anywhere in the areas I'm studying.  In terms of extracurriculars I enjoy being involved with the LRC at UMass as the Supplemental Instructor for CS 250 (Introduction to Computation) and playing pickup soccer with friends.", null);
INSERT INTO team VALUES ('Brandon Read', 'Front-End', "A successful product is the result of careful consideration, passionate enthusiasm, and obsessive attention to detail. A good idea is not enough. A good design is not enough. When people care about what they make--when they know it's something that is absolutely essential to your daily life, they can make some remarkable products. That is what I want to do. I want my products to have meaning--I want them to be used because people love using them. I want to make things that are worth making.  In other news, I love french fries, design, and I'm an intersectional feminist.", null);
INSERT INTO team VALUES ('Alec Hirsch', 'Front-End, Back-End', "I was always interested in computers and how they worked. In high school I started writing games for the TI calculators and have loved programming ever since. Since then I have been doing freelance web developing with WordPress websites. I and am looking to expand my current knowledge of web systems, and am interested in pursuing a career in web development.", null);
INSERT INTO team VALUES ('Ryan Mullens', 'Back-End', "I've always been very interested in languages and am currently attempting to learn german. In high school I never really had much luck with spanish and decided to try programming languages instead! And from that day in freshman year, I haven't stopped programming. I have graded for cs187 and c220 and am currently a tutor for computer science classes at the LRC.", null);
INSERT INTO team VALUES ('David SooHoo', 'Front-End, Back-End', "I've always been that one child in my family that wanted to do bigger things, hence the reason I like big data. Understanding the psychology and sociology of humans is really my passion, and big data is one way of examining them. I knew that I'd dive towards some kind of science degree because of my logical nature and so computer science has been the perfect fit since I entered college. Currently I work for IBM and do work with databases and web development.", null);
INSERT INTO team VALUES ('Eli Sandler', 'Back-End', "I arrived at Umass as a undeclared major with no idea of what I wanted to do, so I took some intro level courses. One of those courses was Computer Science 121, which was my first taste of computer science. I've been hooked ever since. Once I graduate I want to go into the industry and hopefully find a job as network administrator.", null);


--
-- Name: users_uid_seq; Type: SEQUENCE SET; Schema: public; Owner: student
--

SELECT pg_catalog.setval('users_uid_seq', 18, true);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: student; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (uid);


-- PostgreSQL database dump complete
--
