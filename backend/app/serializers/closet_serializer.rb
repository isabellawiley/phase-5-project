class ClosetSerializer < ActiveModel::Serializer
  attributes :id, :title, :is_default, :total_garments

  has_many :garments
  belongs_to :user
end
