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
            return (self.temperatures.min {|temp| temp.low_temperature}).low_temperature
        else
            return nil
        end
    end
    
    def highest_temp
        if self.temperatures.length > 0
            return (self.temperatures.max {|temp| temp.high_temperature}).high_temperature
        else
            return nil
        end
    end
end
