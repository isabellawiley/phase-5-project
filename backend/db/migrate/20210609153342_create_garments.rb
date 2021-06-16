class CreateGarments < ActiveRecord::Migration[6.1]
  def change
    create_table :garments do |t|
      t.string :name
      t.string :garment_style
      t.string :garment_type
      t.boolean :is_favorite, default: false
      t.boolean :is_clean, default: true
      t.references :closet

      t.timestamps
    end
  end
end
