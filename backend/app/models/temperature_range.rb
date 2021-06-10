class TemperatureRange < ApplicationRecord
    belongs_to :garment
    belongs_to :temperature

    validates :garment_id, uniqueness: {scope: :temperature_id}
end
