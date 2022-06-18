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

COMMIT;