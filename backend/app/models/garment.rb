class Garment < ApplicationRecord
    attr_accessor :remove_main_image

    has_one_attached :main_image
    
    belongs_to :user
    belongs_to :closet
    has_many :temperature_ranges
    has_many :temperatures, through: :temperature_ranges
    
    validates :name, :garment_style, :garment_type, presence: true

    def lowest_temp
        (self.temperatures.min {|temp| temp.low_temperature}).low_temperature
    end
    
    def highest_temp
        (self.temperatures.max {|temp| temp.high_temperature}).high_temperature
    end
end
