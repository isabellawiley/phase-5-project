class CreateClosets < ActiveRecord::Migration[6.1]
  def change
    create_table :closets do |t|
      t.string :title
      t.boolean :is_default

      t.timestamps
    end
  end
end
