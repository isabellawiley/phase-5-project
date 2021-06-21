class ClosetSerializer < ActiveModel::Serializer
  attributes :id, :title, :total_garments

  has_many :garments
  belongs_to :user
end
