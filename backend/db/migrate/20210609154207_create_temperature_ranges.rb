class CreateTemperatureRanges < ActiveRecord::Migration[6.1]
  def change
    create_table :temperature_ranges do |t|
      t.integer :garment_id
      t.integer :temperature_id

      t.timestamps
    end
  end
end
