/* File: src/main/resources/data.sql - CORRECTED VERSION */

DELETE FROM sneaker;

INSERT INTO sneaker (name, brand, release_date, image_url, description)
VALUES
('Air Jordan 1', 'Nike', '1985-04-01', 'https://images.stockx.com/images/Air-Jordan-1-Retro-High-OG-Chicago-Reimagined-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2', 'The original icon. The Air Jordan 1 redefined basketball sneakers forever with its bold colors and signature wings logo. A true collector''s item.'),

('Yeezy Boost 350', 'Adidas', '2015-06-27', 'https://images.stockx.com/images/adidas-Yeezy-Boost-350-V2-Zebra-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2', 'Known for its unique zebra stripe pattern and ultra-comfortable Boost cushioning, this sneaker is a streetwear staple and one of the most recognizable shoes of the last decade.'),

('New Balance 550', 'New Balance', '1989-01-01', 'https://images.stockx.com/images/New-Balance-550-White-Green-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2', 'An archival basketball shoe that was brought back to popularity. The 550 features a durable leather upper and a simple, vintage low-top silhouette with maximum versatility.'),

('Puma Suede Classic', 'Puma', '1968-01-01', 'https://images.stockx.com/images/Puma-Suede-Classic-XXI-Black-White-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2', 'A timeless legend in sneaker history, the Puma Suede Classic has been a foundation of breakdancing and hip-hop culture since the late 1960s. Famous for its velvety finish and thick rubber sole.');