class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :birthdate, :email, :garments, :total_garments, :total_closets, :laundry, :laundry_weight, :default_closet_id, :default_closet, :other_closets, :fav_garments

  has_many :closets
end
