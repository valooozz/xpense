-- Nettoyage des tables (ordre inverse des contraintes FK)
TRUNCATE TABLE transaction RESTART IDENTITY CASCADE;
TRUNCATE TABLE category RESTART IDENTITY CASCADE;
TRUNCATE TABLE users RESTART IDENTITY CASCADE;

-- ====================================
-- 1. Utilisateurs
-- ====================================
INSERT INTO users (username, password) VALUES
('alice', 'password123'),
('bob', 'password123'),
('charlie', 'password123'),
('diana', 'password123'),
('edward', 'password123');

-- ====================================
-- 2. Catégories
-- ====================================
INSERT INTO category (label) VALUES
('Nourriture'),
('Logement'),
('Transports'),
('Loisirs'),
('Santé'),
('Éducation'),
('Shopping'),
('Voyages'),
('Épargne'),
('Autres');

-- ====================================
-- 3. Transactions (100 en tout)
-- ====================================

-- Janvier → Août
INSERT INTO transaction (title, type, amount, date, category_id, user_id) VALUES
-- Alice
('Courses supermarché', 0, 75.50, '2025-01-05', 1, 1),
('Loyer janvier', 0, 650.00, '2025-01-01', 2, 1),
('Salaire janvier', 1, 2200.00, '2025-01-02', 9, 1),
('Abonnement Netflix', 0, 12.99, '2025-01-15', 4, 1),
('Médecin généraliste', 0, 25.00, '2025-02-03', 5, 1),
('Cours en ligne', 0, 49.90, '2025-02-10', 6, 1),
('Nouvelles chaussures', 0, 89.00, '2025-03-08', 7, 1),
('Billet de train', 0, 45.00, '2025-03-12', 3, 1),
('Voyage à Rome', 0, 320.00, '2025-04-20', 8, 1),
('Épargne avril', 0, 200.00, '2025-04-30', 9, 1),

-- Bob
('Courses bio', 0, 60.00, '2025-01-07', 1, 2),
('Loyer février', 0, 700.00, '2025-02-01', 2, 2),
('Salaire février', 1, 2300.00, '2025-02-02', 9, 2),
('Cinéma', 0, 18.00, '2025-02-14', 4, 2),
('Dentiste', 0, 80.00, '2025-03-05', 5, 2),
('Cours de guitare', 0, 120.00, '2025-03-18', 6, 2),
('Vêtements Zara', 0, 150.00, '2025-04-02', 7, 2),
('Essence', 0, 55.00, '2025-04-12', 3, 2),
('Billets d’avion', 0, 480.00, '2025-05-10', 8, 2),
('Épargne mai', 0, 250.00, '2025-05-30', 9, 2),

-- Charlie
('Courses hebdo', 0, 72.00, '2025-01-09', 1, 3),
('Loyer mars', 0, 680.00, '2025-03-01', 2, 3),
('Salaire mars', 1, 2100.00, '2025-03-02', 9, 3),
('Concert rock', 0, 90.00, '2025-03-15', 4, 3),
('Pharmacie', 0, 32.00, '2025-04-06', 5, 3),
('Cours de yoga', 0, 60.00, '2025-04-18', 6, 3),
('Pull H&M', 0, 45.00, '2025-05-03', 7, 3),
('Uber', 0, 25.00, '2025-05-10', 3, 3),
('Voyage Espagne', 0, 350.00, '2025-06-22', 8, 3),
('Épargne juin', 0, 180.00, '2025-06-30', 9, 3),

-- Diana
('Courses Carrefour', 0, 95.00, '2025-02-11', 1, 4),
('Loyer avril', 0, 720.00, '2025-04-01', 2, 4),
('Salaire avril', 1, 2400.00, '2025-04-02', 9, 4),
('Spectacle théâtre', 0, 70.00, '2025-04-20', 4, 4),
('Ophtalmologue', 0, 45.00, '2025-05-05', 5, 4),
('Formation pro', 0, 200.00, '2025-05-18', 6, 4),
('Sac à main', 0, 180.00, '2025-06-07', 7, 4),
('Essence', 0, 60.00, '2025-06-14', 3, 4),
('Voyage Grèce', 0, 500.00, '2025-07-12', 8, 4),
('Épargne juillet', 0, 300.00, '2025-07-30', 9, 4),

-- Edward
('Courses Lidl', 0, 55.00, '2025-03-12', 1, 5),
('Loyer mai', 0, 690.00, '2025-05-01', 2, 5),
('Salaire mai', 1, 2250.00, '2025-05-02', 9, 5),
('Match de foot', 0, 40.00, '2025-05-22', 4, 5),
('Médecin spécialiste', 0, 60.00, '2025-06-08', 5, 5),
('Cours d’anglais', 0, 100.00, '2025-06-19', 6, 5),
('Jean Levi’s', 0, 95.00, '2025-07-03', 7, 5),
('Transport bus', 0, 2.50, '2025-07-11', 3, 5),
('Voyage Portugal', 0, 400.00, '2025-08-16', 8, 5),
('Épargne août', 0, 220.00, '2025-08-31', 9, 5);

-- Septembre → Décembre
INSERT INTO transaction (title, type, amount, date, category_id, user_id) VALUES
-- Alice
('Courses de rentrée', 0, 80.00, '2025-09-03', 1, 1),
('Loyer septembre', 0, 650.00, '2025-09-01', 2, 1),
('Salaire septembre', 1, 2200.00, '2025-09-02', 9, 1),
('Cinéma avec amis', 0, 16.00, '2025-09-12', 4, 1),
('Vaccin grippe', 0, 30.00, '2025-10-05', 5, 1),
('Cours de photographie', 0, 150.00, '2025-10-20', 6, 1),
('Nouvelle veste', 0, 120.00, '2025-11-08', 7, 1),
('Train Paris-Lyon', 0, 60.00, '2025-11-18', 3, 1),
('Voyage Londres', 0, 450.00, '2025-12-10', 8, 1),
('Épargne décembre', 0, 250.00, '2025-12-28', 9, 1),

-- Bob
('Courses Carrefour', 0, 70.00, '2025-09-04', 1, 2),
('Loyer octobre', 0, 700.00, '2025-10-01', 2, 2),
('Salaire octobre', 1, 2300.00, '2025-10-02', 9, 2),
('Concert jazz', 0, 55.00, '2025-10-15', 4, 2),
('Consultation ORL', 0, 60.00, '2025-11-07', 5, 2),
('Cours de cuisine', 0, 90.00, '2025-11-20', 6, 2),
('Manteau hiver', 0, 200.00, '2025-11-30', 7, 2),
('Taxi soirée', 0, 25.00, '2025-12-05', 3, 2),
('Vacances ski', 0, 520.00, '2025-12-22', 8, 2),
('Épargne décembre', 0, 300.00, '2025-12-29', 9, 2),

-- Charlie
('Courses hebdo', 0, 68.00, '2025-09-06', 1, 3),
('Loyer octobre', 0, 680.00, '2025-10-01', 2, 3),
('Salaire octobre', 1, 2100.00, '2025-10-02', 9, 3),
('Sortie théâtre', 0, 40.00, '2025-10-18', 4, 3),
('Pharmacie', 0, 18.00, '2025-11-03', 5, 3),
('Cours de dessin', 0, 75.00, '2025-11-15', 6, 3),
('T-shirt Uniqlo', 0, 25.00, '2025-11-25', 7, 3),
('Bus mensuel', 0, 40.00, '2025-12-01', 3, 3),
('Voyage Berlin', 0, 300.00, '2025-12-15', 8, 3),
('Épargne décembre', 0, 220.00, '2025-12-27', 9, 3),

-- Diana
('Courses Monoprix', 0, 100.00, '2025-09-08', 1, 4),
('Loyer novembre', 0, 720.00, '2025-11-01', 2, 4),
('Salaire novembre', 1, 2400.00, '2025-11-02', 9, 4),
('Concert pop', 0, 85.00, '2025-11-10', 4, 4),
('Analyse labo', 0, 35.00, '2025-11-22', 5, 4),
('Cours de danse', 0, 130.00, '2025-12-02', 6, 4),
('Nouvelle robe', 0, 150.00, '2025-12-12', 7, 4),
('Essence', 0, 50.00, '2025-12-15', 3, 4),
('Voyage Maroc', 0, 600.00, '2025-12-20', 8, 4),
('Épargne décembre', 0, 320.00, '2025-12-30', 9, 4),

-- Edward
('Courses discount', 0, 52.00, '2025-09-09', 1, 5),
('Loyer décembre', 0, 690.00, '2025-12-01', 2, 5),
('Salaire décembre', 1, 2250.00, '2025-12-02', 9, 5),
('Cinéma IMAX', 0, 20.00, '2025-12-06', 4, 5),
('Médecin', 0, 45.00, '2025-12-08', 5, 5),
('Cours de piano', 0, 110.00, '2025-12-14', 6, 5),
('Veste en cuir', 0, 250.00, '2025-12-18', 7, 5),
('Métro mensuel', 0, 75.00, '2025-12-01', 3, 5),
('Voyage New York', 0, 1200.00, '2025-12-22', 8, 5),
('Épargne décembre', 0, 400.00, '2025-12-31', 9, 5);
