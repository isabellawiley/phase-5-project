class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :birthdate, :email, :garments, :total_garments, :total_closets

  has_many :closets
end
