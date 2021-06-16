class TemperatureRangeSerializer < ActiveModel::Serializer
  attributes :id, :garment_id, :temperature_id
end
