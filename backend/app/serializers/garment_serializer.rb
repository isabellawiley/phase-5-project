class GarmentSerializer < ActiveModel::Serializer
  attributes :id, :name, :garment_style, :garment_type, :is_favorite, :is_clean, :user_id, :lowest_temp, :highest_temp, :garment_weight, :image, :temperatures

  belongs_to :closet
  has_many :temperatures
end
