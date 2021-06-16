class Closet < ApplicationRecord
    attr_accessor :remove_main_image

    has_one_attached :main_image
    
    belongs_to :user
    has_many :garments

    # validates :title, presence: true

    def total_garments
        self.garments.count
    end
end
