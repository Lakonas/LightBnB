INSERT INTO users (name, email, password)
VALUES 
('Basil', 'bill@bill.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Eleni', 'eleni@eleni.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Aristotle', 'ari@squareofopposition.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bedrooms, number_of_bathrooms, country, street, city, province, post_code, active)
VALUES
(1, 'My Cottage', 'not too bad.', 'thumbnail_cottage.jpg', 'cover_cottage.jpg', 150, 2, 2, 1, 'USA', '42 Maple St', 'Springfield', 'IL', '62704', true),
(2, 'My Cottage', 'shabby.', 'thumbnail_cottage.jpg', 'cover_cottage.jpg', 132, 1, 2, 1, 'Canada', '42 Maple St', 'Paris', 'ON', 'N3T5E3', true),
(3, 'My Cottage', 'Just ok.', 'thumbnail_cottage.jpg', 'cover_cottage.jpg', 120, 1, 2, 1, 'Canada', '42 Maple St', 'Paris', 'ON', 'N3T5E3', true),


INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES (1, '2018-09-11','2018-09-26',1,3 ),
('2019-01-04', '2021-10-14',5,6),
('2019-01-09', '2021-10-15',7,2);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1,2,3,5'good'),
(2,3,4, 5, 'good'),
(3,4,5, 3'ok'),