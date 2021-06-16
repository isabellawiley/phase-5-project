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
                garments.push(garment)
            end
        end
        garments
    end

    def total_garments
        self.closets.sum {|closet| closet.total_garments}
    end

    def total_closets
        self.closets.count
    end
end
