class Garment < ApplicationRecord
    attr_accessor :remove_main_image

    has_one_attached :main_image
    
    belongs_to :closet
    has_many :temperature_ranges
    has_many :temperatures, through: :temperature_ranges
    
    validates :name, presence: true

    def user
        self.closet.user
    end

    def lowest_temp
        if self.temperatures.length > 0
            return (self.temperatures.min {|t1, t2| t1.low_temperature <=> t2.low_temperature}).low_temperature
        else
            return nil
        end
    end
    
    def highest_temp
        if self.temperatures.length > 0
            return (self.temperatures.max {|t1, t2| t1.high_temperature <=> t2.high_temperature}).high_temperature
        else
            return nil
        end
    end

    def garment_weight
        if self.garment_type == "short-sleeve shirt"
            return 200
        elsif self.garment_type == "long-sleeve shirt"
            return 250
        elsif self.garment_type == "sleeveless shirt"
            return 150
        elsif self.garment_type == "long pants"
            return 500
        elsif self.garment_type == "mid-length pants"
            return 400
        elsif self.garment_type == "shorts"
            return 300
        elsif self.garment_type == "dress"
            return 350
        elsif self.garment_type == "sweater/sweatshirt"
            return 400
        else
            return 0
        end
    end
end
