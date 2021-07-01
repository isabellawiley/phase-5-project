class User < ApplicationRecord
    has_secure_password

    has_many :closets

    # validates :name, :birthdate, :email, :password, presence: true
    # validates :email, format: /@/
    # validates :email, uniqueness: true

    def garments
        garments = []
        self.closets.map do |closet|
            closet.garments.map do |garment|
                garments.push({id: garment.id, name: garment.name, garment_style: garment.garment_style, garment_type: garment.garment_type, is_favorite: garment.is_favorite, is_clean: garment.is_clean, closet_id: garment.closet_id, image: garment.image, temperatures: garment.temperatures, user: garment.user, lowest_temp: garment.lowest_temp, highest_temp: garment.highest_temp, garment_weight: garment.garment_weight, temperatures: garment.temperatures, temperature_ranges: garment.temperature_ranges})
            end
        end
        garments
    end

    def laundry
        self.garments.select {|garment| garment[:is_clean] == false}
    end

    def laundry_weight
        self.laundry.sum{|garment| garment[:garment_weight]}
    end

    def default_closet
        self.closets.select {|closet| closet.id == self[:default_closet_id]}
    end

    def other_closets
        self.closets.select {|closet| closet.id != self[:default_closet_id]}
    end

    def fav_garments
        self.garments.select {|garment| garment[:is_favorite] == true}
    end

    def total_garments
        self.closets.sum{|closet| closet.total_garments}
    end

    def total_closets
        self.closets.count
    end
end
