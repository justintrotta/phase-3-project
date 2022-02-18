class Completion < ActiveRecord::Base
    belongs_to :quotes
    belongs_to :author

end