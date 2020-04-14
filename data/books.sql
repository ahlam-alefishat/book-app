DROP TABLE IF EXISTS books;

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    author VARCHAR(255),
    isbn VARCHAR(255),
    image_url VARCHAR(255),
    description TEXT,
    bookshelf VARCHAR(255)
);
INSERT INTO books(title,author,isbn,image_url,description, bookshelf)
VALUES
 ('Amman: Gulf Capital, Identity, and Contemporary Megaprojects',
  'Majd Musa',
  '1317193733,9781317193739', 
  'https://books.google.jo/books/content?id=GCslDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE738IGOiqyxjN7X02lg3DiL_QbjRmmIUA44W35mWWqkdymhRwd4A_Img26IxRcP8MBao71Cm0rOiYoIGrU9NYGDIYNlbmMHVjPc-0pcu7JOuigdcJHawjWzBPivDUaE3_zXYoRcD',
  'Gulf capital flows to Amman, Jordan, in the early twenty-first century and the investment of this capital in large-scale urban developments have significantly transformed the city’s built environment. Therefore, to understand urban transformation in Amman during this period it is important to analyze it against the backdrop of Gulf capital and its integration into Jordan’s economy and the integration of both the country’s economy and Gulf capital into the global capitalist economy.
This book analyzes three cases of megaprojects planned for the city in the early twenty-first century: The New Downtown (Abdali), Jordan Gate, and Sanaya Amman. Drawing upon theories on urban development and capitalism, identity, and discourse, and urban development processes and cases in other cities, the book investigates how contemporary megaprojects in Amman fit into the capitalist economy and its modes of production, how capital flows construct a modern image of the city, and how the new image and megaprojects represent the city residents as modern and create Amman as a global city.
This book presents a new approach to the study of the urban built environment in Amman, providing a valuable interdisciplinary contribution to the scholarly work on globalizing cities, especially in the Middle East.',
'4545');
INSERT INTO books(title,author,isbn,image_url,description, bookshelf)
VALUES
 ('Amman: Gulf Capital, Identity, and Contemporary Megaprojects',
  'Majd Musa',
  '1317193733,9781317193739', 
  'https://books.google.jo/books/content?id=GCslDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE738IGOiqyxjN7X02lg3DiL_QbjRmmIUA44W35mWWqkdymhRwd4A_Img26IxRcP8MBao71Cm0rOiYoIGrU9NYGDIYNlbmMHVjPc-0pcu7JOuigdcJHawjWzBPivDUaE3_zXYoRcD',
  'Gulf capital flows to Amman, Jordan, in the early twenty-first century and the investment of this capital in large-scale urban developments have significantly transformed the city’s built environment. Therefore, to understand urban transformation in Amman during this period it is important to analyze it against the backdrop of Gulf capital and its integration into Jordan’s economy and the integration of both the country’s economy and Gulf capital into the global capitalist economy.
This book analyzes three cases of megaprojects planned for the city in the early twenty-first century: The New Downtown (Abdali), Jordan Gate, and Sanaya Amman. Drawing upon theories on urban development and capitalism, identity, and discourse, and urban development processes and cases in other cities, the book investigates how contemporary megaprojects in Amman fit into the capitalist economy and its modes of production, how capital flows construct a modern image of the city, and how the new image and megaprojects represent the city residents as modern and create Amman as a global city.
This book presents a new approach to the study of the urban built environment in Amman, providing a valuable interdisciplinary contribution to the scholarly work on globalizing cities, especially in the Middle East.',
'4545');