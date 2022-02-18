class CreateCompletions < ActiveRecord::Migration[6.1]
  def change
    create_table :completions do |t|
      t.string :text
      t.references :quote
      t.references :author
    end
  end
end
