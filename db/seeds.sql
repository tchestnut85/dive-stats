\c diving_db;

BEGIN;

INSERT INTO certifications (name, minimum_age, required_hours)
VALUES
  ('Open Water Diver', 10, 15),
  ('Advanced Open Water Diver', 12, 8),
  ('Enriched Air Diver', 12, 18),
  ('Rescue Diver', 12, 12),
  ('Deep Diver', 15, 4);

INSERT INTO divers (first_name, last_name, is_instructor, certification_id)
VALUES
  ('Darya', 'Poole', TRUE, 2),
  ('Douglas', 'Fisher', FALSE, 3),
  ('Kai', 'Seabrook', FALSE, 3),
  ('Kendall', 'Rivers', TRUE, 4),
  ('Mira', 'Waters', FALSE, 5);

INSERT INTO locations (name, coordinates)
VALUES
  ('Barracude Point', POINT(4.112742, 118.631106)),
  ('Cape Kri', POINT(-0.556324, 130.690725)),
  ('SS Yongala', POINT(-19.304703, 147.623977)),
  ('Great Blue Hole', POINT(17.316007, -87.535225)),
  ('Richelieu Rock', POINT(9.362752, 98.021727));

INSERT INTO tags (location_id, name)
VALUES
  (1, 'wall'),
  (2, 'sharks'),
  (2, 'current'),
  (3, 'wreck'),
  (3, 'sharks'),
  (5, 'sharks'),
  (5, 'reef'),
  (5, 'current');

INSERT INTO locations (name, coordinates)
SELECT
  CONCAT('Unknown locations #', loc_id),
  POINT(random_between(-90, 90), random_between(-180, 180))
FROM generate_series(1, 50) AS loc_id;

INSERT INTO dives (depth, dive_date, duration, diver_id, location_id)
SELECT
  random_between(1, 300) * RANDOM(),
  NOW() - ('1 day'::INTERVAL*random_between(1, 1000)),
  random_between(1, 720),
  random_between(1, 5),
  random_between(1, 5)
FROM generate_series(1, 1000);

COMMIT;
