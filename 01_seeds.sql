INSERT INTO users (id,name, email, password)
VALUES (1, 'Basil', 'bill@bill.com', "$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u"),
(2, 'Eleni', 'eleni@eleni.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
{3, 'Aristotle', 'ari@squareofopposition.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'},

INSERT INTO properties (id, owner_id, title, thumbnail_photo, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active);
VALUES(1,5, 'mR'),
(2,2,'MRS'),
(3,3,'TEACHER');

INSERT INTO reservations (1d,start_date, end_date)
VALUES (1, '2018-09-11','2018-09-26' ),
(1,'2019-01-04', '2021-10-14'),
(1,'2019-01-04', 2021-10-14 );

INSERT INTO property_reviews ( id, guest_id, property_id)
VALUES (1,2,3),
(2,3,4),
(3,4,5);