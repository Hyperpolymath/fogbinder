{
  description = "Fogbinder - Navigate epistemic ambiguity in research";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    deno2nix = {
      url = "github:SnowflakePow

derLord/deno2nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { self, nixpkgs, flake-utils, deno2nix }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [ deno2nix.overlays.default ];
        };
      in
      {
        packages = {
          default = pkgs.buildNpmPackage {
            pname = "fogbinder";
            version = "0.1.0";

            src = ./.;

            npmDepsHash = "sha256-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
            # Run: nix-build -E 'with import <nixpkgs> {}; buildNpmPackage { pname = "fogbinder"; version = "0.1.0"; src = ./.; npmDepsHash = lib.fakeSha256; }'
            # To get real hash

            nativeBuildInputs = with pkgs; [
              nodejs_20
              deno
            ];

            buildPhase = ''
              # Install ReScript dependencies
              npm install

              # Compile ReScript to JavaScript
              npm run res:build

              # Bundle with Deno
              deno task build
            '';

            installPhase = ''
              mkdir -p $out/bin
              mkdir -p $out/lib/fogbinder

              # Copy built artifacts
              cp -r dist/* $out/lib/fogbinder/
              cp -r src/*.bs.js $out/lib/fogbinder/
              cp package.json $out/lib/fogbinder/

              # Create executable wrapper
              cat > $out/bin/fogbinder <<EOF
              #!/bin/sh
              exec ${pkgs.deno}/bin/deno run --allow-all $out/lib/fogbinder/fogbinder.js "\$@"
              EOF
              chmod +x $out/bin/fogbinder
            '';

            meta = with pkgs.lib; {
              description = "Navigate epistemic ambiguity in research";
              homepage = "https://github.com/Hyperpolymath/fogbinder";
              license = licenses.agpl3Plus;
              maintainers = [ ];
              platforms = platforms.all;
            };
          };
        };

        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            # Core runtime
            deno
            nodejs_20

            # Development tools
            git
            just

            # Optional: Documentation
            mdbook

            # Optional: Testing
            jq
          ];

          shellHook = ''
            echo "🌫️  Fogbinder Development Environment"
            echo "======================================"
            echo "Deno: $(deno --version | head -1)"
            echo "Node: $(node --version)"
            echo ""
            echo "Commands:"
            echo "  npm install    - Install dependencies"
            echo "  npm run build  - Build project"
            echo "  deno task test - Run tests"
            echo "  just --list    - Show all tasks"
            echo ""
            echo "Philosophy: Late Wittgenstein + J.L. Austin"
            echo "The fog is not an obstacle. It's the medium of inquiry. 🌫️"
          '';
        };

        apps.default = {
          type = "app";
          program = "${self.packages.${system}.default}/bin/fogbinder";
        };

        checks = {
          build = self.packages.${system}.default;

          test = pkgs.runCommand "fogbinder-test" {
            buildInputs = [ pkgs.deno pkgs.nodejs_20 ];
          } ''
            cp -r ${./.} source
            cd source
            chmod -R +w .

            # Install and build
            npm install
            npm run res:build

            # Run tests
            deno task test

            # Create output marker
            touch $out
          '';

          lint = pkgs.runCommand "fogbinder-lint" {
            buildInputs = [ pkgs.deno pkgs.nodejs_20 ];
          } ''
            cp -r ${./.} source
            cd source
            chmod -R +w .

            # Deno lint
            deno lint

            # ReScript format check
            npm install
            npx rescript format -check

            touch $out
          '';
        };
      }
    );
}
