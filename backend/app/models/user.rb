class User < ApplicationRecord
    has_secure_password

    has_many :garments
    has_many :closets, through: :garments
    has_many :temperature_ranges, through: :garments

    validates :name, :birthdate, :email, :password, presence: true
    validates :email, format: /@/
    validates :email, uniqueness: true

    def total_garments
        self.garments.count
    end

    def total_closets
        self.closets.count
    end
end
