class AddCreatorToBox < ActiveRecord::Migration
  def up
    add_column :boxes, :creator, :integer
  end

  def down
    remove_column :boxes, :creator
  end
end
