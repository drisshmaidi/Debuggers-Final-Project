CREATE TABLE events (
    id serial primary key,
    title VARCHAR (250) UNIQUE NOT NULL,
    img VARCHAR(3000) NOT NULL,
    description VARCHAR(250) date DATE NOT NULL,
    location VARCHAR(250),
    url VARCHAR (250) NOT NULL,
);

INSERT INTO
    events
values
    (
        1,
        'Supporting Speech Language and Communication Skills Online Training session',
        'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F397915419%2F305297916809%2F1%2Foriginal.20200521-081253?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C22%2C718%2C359&s=25768d0e78058dea100394b7b2f95c69',
        'This course provides an overview of what is meant by the terms speech, language and communication, how these areas develop and what can be done to support children across KS1 & KS2 with development of these skills.',
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
        'Birmingham, B2 5HU',
        'https://www.eventbrite.co.uk/e/birmingham-language-exchange-tickets-327081849617?aff=ebdssbdestsearch'
    ),
    (
        3,
        'Teach, Share, Transform: Maths, English and Digital Skills (Solihull)',
        'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F407388099%2F260649366528%2F1%2Foriginal.20221209-105004?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C85%2C1024%2C512&s=d690415fcdf6e957cf9e5c21ef9127c1',
        'This Teach, Share, Transform face to face meet up is aimed towards teachers of English, maths and digital skills. The sessions will be facilitated by NCFE Provider Development Officers: Patricia Devlin (English specialist).',
        '2023-03-07',
        'Solihull, B91 3LT',
        'https://www.eventbrite.co.uk/e/teach-share-transform-maths-english-and-digital-skills-solihull-tickets-484286803867?aff=ebdssbdestsearch'
    ),
    (
        4,
        'English Functional Skills - West Bridgford Library - Adult Learning',
        'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F338909669%2F190528611274%2F1%2Foriginal.20220820-075400?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C34%2C836%2C418&s=bc2b7731674ef93a9e438592853a38e8',
        'If you are new to learning English as a second language, an ESOL course will be more suitable for you, and these are listed on our website.This course aims to improve your English skills and your confidence in using these.',
        '2023-06-24',
        'Nottingham, NG2 6AT',
        'https://www.eventbrite.co.uk/e/english-functional-skills-west-bridgford-library-adult-learning-tickets-405535647037?aff=ebdssbdestsearch'
    );