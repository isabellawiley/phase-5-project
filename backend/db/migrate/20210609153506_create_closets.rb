class CreateClosets < ActiveRecord::Migration[6.1]
  def change
    create_table :closets do |t|
      t.string :title
      t.references :user

      t.timestamps
    end
  end
end
