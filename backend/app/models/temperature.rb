class Temperature < ApplicationRecord
    has_many :temperature_ranges
    has_many :garments, through: :temperature_ranges
end
