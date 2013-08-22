class User < ActiveRecord::Base
  attr_accessible :email, :gender, :id, :name, :password, :username

  has_one :user_role_relation
  has_one :role, :through => :user_role_relation
end
