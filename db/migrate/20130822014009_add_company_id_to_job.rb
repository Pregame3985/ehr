class AddCompanyIdToJob < ActiveRecord::Migration
  def up
    add_column :jobs, :company_id, :integer
  end

  def down
    remove_column :jobs, :company_id
  end
end
