DROP TABLE IF EXISTS events;

CREATE TABLE events (
    id serial primary key,
    title VARCHAR (250) UNIQUE NOT NULL,
    img VARCHAR(3000) NOT NULL,
    description VARCHAR(250),
    date DATE NOT NULL,
    location VARCHAR(250),
    url VARCHAR (250) NOT NULL
);

INSERT INTO
    events
values
    (
        1,
        'Supporting Speech Language and Communication Skills Online Training session',
        'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F397915419%2F305297916809%2F1%2Foriginal.20200521-081253?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C22%2C718%2C359&s=25768d0e78058dea100394b7b2f95c69',
        'This course provides an overview of what is meant by the terms speech, language and communication, how these areas develop and what can be done to support children',
        '2023-03-01',
        'Online',
        'https://www.eventbrite.co.uk/e/supporting-speech-language-and-communication-skills-online-training-session-tickets-472469979427?aff=ebdssbonlinesearch'
    ),
    (
        2,
        'Birmingham Language Exchange',
        'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F272379419%2F614297308833%2F1%2Foriginal.20211002-130757?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C150%2C1200%2C600&s=5889cb025bed62e88f902448d3fe0120',
        'Come to practise new languages, and also to share your native language skills - we are all teachers and students. All languages are welcome, and we do our best to match you with other people.',
        '2023-03-16',
        'Birmingham',
        'https://www.eventbrite.co.uk/e/birmingham-language-exchange-tickets-327081849617?aff=ebdssbdestsearch'
    ),
    (
        3,
        'Teach, Share, Transform: Maths, English and Digital Skills (Solihull)',
        'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F407388099%2F260649366528%2F1%2Foriginal.20221209-105004?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C85%2C1024%2C512&s=d690415fcdf6e957cf9e5c21ef9127c1',
        'This Teach, Share, Transform face to face meet up is aimed towards teachers of English, maths and digital skills. The sessions will be facilitated by NCFE Provider Development Officers',
        '2023-03-07',
        'Solihull',
        'https://www.eventbrite.co.uk/e/teach-share-transform-maths-english-and-digital-skills-solihull-tickets-484286803867?aff=ebdssbdestsearch'
    ),
    (
        4,
        'English Functional Skills - West Bridgford Library - Adult Learning',
        'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F338909669%2F190528611274%2F1%2Foriginal.20220820-075400?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C34%2C836%2C418&s=bc2b7731674ef93a9e438592853a38e8',
        'If you are new to learning English as a second language, an ESOL course will be more suitable for you, and these are listed on our website.This course aims to improve your English skills',
        '2023-06-24',
        'Nottingham',
        'https://www.eventbrite.co.uk/e/english-functional-skills-west-bridgford-library-adult-learning-tickets-405535647037?aff=ebdssbdestsearch'
    ),
    (
        5,
        'Manchester Language Exchange',
        'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F309942549%2F614297308833%2F1%2Foriginal.20220127-202927?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C252%2C2016%2C1008&s=d40646db6314186b50329cfb1bce809c',
        'Manchester Language Exchange, every Thursday in the city centre! Come to practise new languages, and also to share your native language skills - we are all teachers and students.',
        '2023-07-23',
        'Manchester',
        'https://www.eventbrite.co.uk/e/manchester-language-exchange-tickets-257242759017?aff=ebdssbdestsearch'
    ),
    (
        6,
        'Hustle Club Networking: Female Only Connection & Coaching',
        'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F434820799%2F715669430983%2F1%2Foriginal.20230130-111107?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C60%2C1920%2C960&s=f9cc26d13039bae94f2a7487b3a014f4',
        'E﻿ach month on the 2nd Thursday we invite members of The Harmonious Hustle Club and non members to connect at The Exchange in their cellar venue from 6pm - 8pm',
        '2023-07-13',
        'Leicester',
        'https://www.eventbrite.co.uk/e/the-harmonious-hustle-club-networking-female-only-connection-coaching-tickets-492791030237?aff=ebdssbdestsearch'
    ),
    (
        7,
        'Birmingham International Speakers Club',
        'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F146117397%2F515258876959%2F1%2Foriginal.20210831-131950?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C200%2C800%2C400&s=952eada09e898efff359de88863f2044',
        'Being able to speak in public is a skill that can help you to accomplish so much in life which is why, with our coaching, our members have gone on to achieve great things',
        '2023-06-28',
        'Birmingham',
        'https://www.eventbrite.co.uk/e/birmingham-international-speakers-club-moseley-birmingham-tickets-165645202259?aff=ebdssbdestsearch'
    ),
    (
        8,
        'Language Exchange English/Spanish',
        'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F442413559%2F815911467523%2F1%2Foriginal.20230208-235341?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C59%2C1640%2C820&s=fda399b328a69527b44ccdbf1f6764a1',
        'A fun, friendly, and open environment for cultural exchange, practising your language skills, making new friends, and supporting local businesses. All languages are welcome.',
        '2023-03-07',
        'Wilmslow',
        'https://www.eventbrite.co.uk/e/language-exchange-englishspanish-wilmslow-tickets-539833104347?aff=ebdssbdestsearch'
    );