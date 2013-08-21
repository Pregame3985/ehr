class AddStartAtAndEndAtToEvent < ActiveRecord::Migration
  def up
    add_column :events, :start_time, :timestamp
    add_column :events, :end_time, :timestamp
    add_column :events, :all_day, :boolean
  end

  def down
    remove_column :events, :start_time
    remove_column :events, :end_time
    remove_column :events, :all_day
  end
end
