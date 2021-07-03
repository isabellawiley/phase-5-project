class Closet < ApplicationRecord
    belongs_to :user
    has_many :garments

    # validates :title, presence: true

    def total_garments
        self.garments.count
    end
end
