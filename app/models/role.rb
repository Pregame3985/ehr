class Role < ActiveRecord::Base
  attr_accessible :id, :name

  has_many :users, :through => :user_role_relations
end
