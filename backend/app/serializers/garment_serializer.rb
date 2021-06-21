class GarmentSerializer < ActiveModel::Serializer
  attributes :id, :name, :garment_style, :garment_type, :is_favorite, :is_clean, :user, :lowest_temp, :highest_temp, :garment_weight

  belongs_to :closet
  has_many :temperatures
end
