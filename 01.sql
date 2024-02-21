SELECT c.id, c.name
    FROM tbl_comuna c
    JOIN tbl_region r ON c.region_id = r.id
    WHERE LOWER(r.name) LIKE '%m%';
