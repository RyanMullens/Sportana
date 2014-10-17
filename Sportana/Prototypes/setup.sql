
Create database sportana;

\c sportana;
--
-- Name: users; Type: TABLE; Schema: public; Owner: student; Tablespace: 
--

CREATE TABLE users (
    uid integer NOT NULL,
    email text,
    password text
);


ALTER TABLE public.users OWNER TO student;

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

INSERT INTO users VALUES (1, 'ryan@mullens', 'password');
INSERT INTO users VALUES (2, 'John@Smith.com', 'apple');
INSERT INTO users VALUES (3, 'jane@doe.com', '12345');
INSERT INTO users VALUES (4, 'test@test.com', 'test');
INSERT INTO users VALUES (5, 'Apple@sauce.com', '123321');
INSERT INTO users VALUES (16, 'rmullens@umass.edu', '12345');


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
