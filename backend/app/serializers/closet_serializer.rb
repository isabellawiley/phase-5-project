class ClosetSerializer < ActiveModel::Serializer
  attributes :id, :title, :total_garments, :image

  has_many :garments
  belongs_to :user
end
