-- Query the number of dives for a particular diver_id
SELECT COUNT(diver_id) AS number_of_dives
FROM dives
WHERE diver_id = 1
GROUP BY diver_id;

-- Query the average dive duration for each location_id
SELECT AVG(duration)::INT AS average_duration 
FROM dives
GROUP BY location_id;

-- Query the average dive duration for a particular location_id
SELECT AVG(duration)::INT AS average_duration 
FROM dives
WHERE location_id = 1
GROUP BY location_id;

-- Query the most active dive month
SELECT DATE_TRUNC('month', dive_date) AS month,
COUNT(*) AS dive_count
FROM DIVES
WHERE dive_date > NOW() - INTERVAL '1 year'
GROUP BY month
ORDER BY dive_count DESC LIMIT 1;

-- Query to find the deepest dive depth as the diver
SELECT CONCAT(divers.first_name, ' ', divers.last_name) AS diver_name, dives.depth
FROM dives
LEFT JOIN divers ON dives.diver_id = divers.id
WHERE dives.depth = (
  SELECT MAX(depth)
  FROM dives
  WHERE location_id = 1
);

-- Common Table expression (CTE) Query for the most common certification at the given location
WITH certs AS (
  SELECT DISTINCT dives.diver_id, certications.name FROM dives
  LEFT JOIN divers ON dives.diver_id = divers.id
  LEFT JOIN certifications ON divers.certification_id = certifications.id
  WHERE dives.location_id = 1
  GROUP BY dives.diver_id, certifications.name
)
SELECT name FROM certs
GROUP BY name
ORDER BY COUNT(name) DESC LIMIT 1;
