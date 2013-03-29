class Games < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer :player_a, :player_b, :winner_id
      
      t.string :board, :default => '_________'

      t.timestamps
    end
  end
end
