INSERT INTO users (name, email, password)
VALUES 
('Basil', 'bill@bill.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Eleni', 'eleni@eleni.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Aristotle', 'ari@squareofopposition.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (id, owner_id, title,)
VALUES(1,5, 'mR'),
(2,2,'MRS'),
(3,3,'TEACHER');

INSERT INTO reservations (id,start_date, end_date, property_id, guest_id)
VALUES (1, '2018-09-11','2018-09-26',1,3 ),
(1,'2019-01-04', '2021-10-14',2,3),
(1,'2019-01-04', '2021-10-14',2,2);

INSERT INTO property_reviews (guest_id, property_idreservation_id, rating, message)
VALUES (1,2,3),
(2,3,4, 'message'),
(3,4,5 'message');