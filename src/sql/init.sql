CREATE TYPE district_enum AS ENUM (
    'Gangtok',
    'Namchi',
    'Mangan',
    'Gyalshing',
    'Pakyong',
    'Soreng'  
);
CREATE TYPE display_value AS ENUM (
    'Active',
    'Inactive' 
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(150) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS fir_registry (
    id SERIAL PRIMARY KEY,
    police_station_code VARCHAR(50) NOT NULL,
    law_enforcement_agency VARCHAR(255) NOT NULL,
    national_code VARCHAR(50) NOT NULL,
    last_fir_no VARCHAR(50),
    last_fir_year INT,
    last_charge_sheet_date DATE,
    district district_enum NOT NULL,
    taluk VARCHAR(100) NOT NULL,
    law_enforcement_type VARCHAR(100),
    display display_value NOT NULL,
    created_by INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 