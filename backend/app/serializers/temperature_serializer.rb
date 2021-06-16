class TemperatureSerializer < ActiveModel::Serializer
  attributes :id, :low_temperature, :high_temperature

end
